const env = require('./env');
const http = require('http');
const Request = require('./Request');
const Response = require('./Response');
const url = require('url');

const noop = () => {};

/**
 * @typedef {function(request: Request, response: Response)} RouteHandler
 */

/**
 * @typedef {Object<string, RouteHandler>} Route
 */

module.exports = class Bq {
    constructor() {
        this.routes = {};

        const defaults = {
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
     * @param {string} path - The path name to get/set the route (e.g. '/resource').
     * @param {Route} [route] - An object consisting of callback functions mapped to method keys.
     * @return {function(request: Request, response: Response)}
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
     * @param {Object} [settings={port: env('BQ_RUN_DEFAULT_PORT')}] - The port setting defaults to `8080` if no envvar is set.
     * @return {http.Server} The server instance that has been started.
     */
    run(settings = {}) {
        const defaults = {port: env('BQ_RUN_DEFAULT_PORT')};
        const _settings = Object.assign(defaults, settings);
        const uri = `http://localhost:${_settings.port}`;
        const server = http.createServer(this.serve.bind(this));

        if (env('BQ_RUN_DISPLAY_MSG')) {
            console.log(`Now listening at <${uri}>.`);
        }

        return server.listen(_settings.port);
    }

    /**
     * The callback invoked by `#run()` when the server receives a client request.
     *
     * @param {http.IncomingMessage} request
     * @param {http.IncomingMessage} response
     * @return {boolean}
     */
    serve(request, response) {
        let _request = new Request(request);
        let _response = new Response(response);
        let route = this.route(_request.path);
        let method = _request.method;

        if (route && route[method]) {
            route[method](_request, _response);
        } else {
            Object.assign(_response, {statusCode: 404, text: 'Resource not found.'});
        }

        return _response.send();
    }
};
