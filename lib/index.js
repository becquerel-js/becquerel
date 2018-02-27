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
     * @param {http.IncomingMessage} incomingMessage
     * @param {http.ServerResponse} serverResponse
     * @return {undefined}
     * @see https://nodejs.org/api/http.html#http_class_http_incomingmessage
     * @see https://nodejs.org/api/http.html#http_class_http_serverresponse
     * @see https://nodejs.org/api/http.html#http_response_end_data_encoding_callback
     */
    serve(incomingMessage, serverResponse) {
        let request = new Request(incomingMessage);
        let response = new Response(serverResponse);
        let route = this.route(request.path);
        let method = request.method;

        if (!route || !route[method]) {
            Object.assign(response, {statusCode: 404, text: 'Resource not found.'});
            response.send();

            return;
        }

        const callback = route[method];

        /** @see https://stackoverflow.com/questions/38508420/how-to-know-if-a-function-is-async#answer-38510353 */
        if (callback[Symbol.toStringTag] === 'AsyncFunction') {
            callback(request, response).catch(error => {
                Object.assign(response, {statusCode: 500, text: JSON.stringify(error)});
            }).then(() => {
                response.send();
            });
        } else {
            callback(request, response);
            response.send();
        }
    }
};
