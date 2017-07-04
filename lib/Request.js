const url = require('url');

module.exports = class Request {
    constructor(request) {
        this.accept = request.headers.accept;
        this.acceptLanguage = request.headers['accept-language'];
        this.method = request.method.toLowerCase();
        this.path = url.parse(request.url).pathname;
    }
};
