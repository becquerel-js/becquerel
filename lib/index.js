const env = require('./env');
const http = require('http');
const Request = require('./Request');
const Response = require('./Response');
const url = require('url');

const noop = () => {};

module.exports = class Bq {
    constructor() {
        this.routes = {};

        const defaults = {
            BQ_DEFAULT_CHARSET: 'utf-8',
            BQ_RUN_DEFAULT_PORT: 8080,
            BQ_RUN_DISPLAY_MSG: true
        };

        Object.entries(defaults).forEach(pair => {
            const [name, value] = pair;

            if (env(name) === undefined) {
                env(name, value);
            }
        });
    }

    /**
     * A helper method to work with the instance's internal `#routes` property.
     * Acts as a getter if the `route` parameter is not specified and a setter
     * if it is. This method always returns the specified route object.
     *
     * @param {string} path - The path name to get/set the route _(e.g. `'/resource'`)_.
     * @param {Route} [route] - An object consisting of callback functions mapped to method keys.
     * @return {RouteHandler}
     */
    route(path, route) {
        if (route) {
            this.routes[path] = route;
        }

        return this.routes[path] || noop;
    }

    /**
     * Start the app server.
     *
     * @param {Object} [settings={port: 8080}] - The port setting defaults to the value of the `BQ_RUN_DEFAULT_PORT` envvar.
     * @return {http.Server} The server instance that has been started.
     * @see https://nodejs.org/api/http.html#http_class_http_server
     */
    run(settings = {}) {
        const defaults = {port: env('BQ_RUN_DEFAULT_PORT')};
        const {port} = Object.assign(defaults, settings);
        const uri = `http://localhost:${port}/`;
        const server = http.createServer(this.serve.bind(this));

        if (env('BQ_RUN_DISPLAY_MSG')) {
            console.log(`Now listening at <${uri}>.`);
        }

        return server.listen(port);
    }

    /**
     * The callback invoked by `#run()` when the server receives a client request.
     *
     * @param {http.IncomingMessage} request
     * @param {http.ServerResponse} response
     * @return {undefined}
     * @see https://nodejs.org/api/http.html#http_class_http_incomingmessage
     * @see https://nodejs.org/api/http.html#http_class_http_serverresponse
     * @see https://nodejs.org/api/http.html#http_response_end_data_encoding_callback
     */
    serve(request, response) {
        let _request = new Request(request);
        let _response = new Response(response);
        let route = this.route(_request.path);
        let method = _request.method;

        if (!route || !route[method]) {
            Object.assign(_response, {statusCode: 404, text: 'Resource not found.'});
            _response.send();

            return;
        }

        const callback = route[method];

        if (callback[Symbol.toStringTag] === 'AsyncFunction') {
            callback(_request, _response).catch(error => {
                Object.assign(_response, {statusCode: 500, text: JSON.stringify(error)});
            }).then(() => {
                _response.send();
            });
        } else {
            callback(_request, _response);
            _response.send();
        }
    }
};
