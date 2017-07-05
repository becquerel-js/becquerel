const chalk = require('chalk');
const http = require('http');
const Request = require('./Request');
const Response = require('./Response');
const url = require('url');

module.exports = class Bq {
    constructor() {
        this.routes = {};
    }

    route(path, methods) {
        if (!methods) {
            return this.routes[path];
        }

        this.routes[path] = methods;
    }

    run(settings = {}) {
        const defaults = {port: 8080};
        const _settings = Object.assign(defaults, settings);
        const uri = `http://localhost:${_settings.port}`;
        const server = http.createServer(this.serve.bind(this));

        server.listen(_settings.port);
        console.log(`Now listening at ${chalk.bold(uri)}.`);
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
