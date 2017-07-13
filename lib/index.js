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

    route(path, methods) {
        if (methods) {
            this.routes[path] = methods;
        }

        return this.routes[path] || noop;
    }

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
     * The callback invoked by `.run()` when the server receives a client request.
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
