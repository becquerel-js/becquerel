const env = require('./env');
const http = require('http');
const Request = require('./Request');
const Response = require('./Response');
const url = require('url');

const noop = () => {};

module.exports = class Bq {
    constructor() {
        this.routes = {};

        if (env('BQ_RUN_DISPLAY_MSG') === undefined) {
            env('BQ_RUN_DISPLAY_MSG', true);
        }
    }

    route(path, methods) {
        if (methods) {
            this.routes[path] = methods;
        }

        return this.routes[path] || noop;
    }

    run(settings = {}) {
        const defaults = {port: 8080};
        const _settings = Object.assign(defaults, settings);
        const uri = `http://localhost:${_settings.port}`;
        const server = http.createServer(this.serve.bind(this));

        if (env('BQ_RUN_DISPLAY_MSG')) {
            console.log(`Now listening at <${uri}>.`);
        }

        return server.listen(_settings.port);
    }

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

        _response.send();
    }
};
