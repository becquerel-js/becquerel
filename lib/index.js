const chalk = require('chalk');
const http = require('http');
const Request = require('./Request');
const url = require('url');

module.exports = class Bq {
    constructor() {
        this.routes = {};
    }

    listen(...args) {
        const server = http.createServer(this.serve.bind(this));

        server.listen(...args);
        console.log(`Now listening at ${chalk.bold('http://localhost:' + args[0])}`);
    }

    route(path, methods) {
        if (!methods) {
            return this.routes[path];
        }

        this.routes[path] = methods;
    }

    serve(request, response) {
        let _request = new Request(request);
        let route = this.route(_request.path);
        let method = _request.method;

        if (route && route[method]) {
            route[method](response);
        } else {
            response.statusCode = 404;
            response.write('Resource not found.');
        }

        response.end();
    }
};
