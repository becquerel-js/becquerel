const querystring = require('querystring');
const url = require('url');

module.exports = class Request {
    constructor(request) {
        const _url = url.parse(request.url);
        this.accept = request.headers.accept;
        this.acceptLanguage = request.headers['accept-language'];
        this.host = request.headers['host'];
        this.method = request.method.toLowerCase();
        this.path = _url.pathname;
        this.query = querystring.parse(_url.query);
        this.userAgent = request.headers['user-agent'];
    }
};
