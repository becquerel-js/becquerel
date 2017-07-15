const querystring = require('querystring');
const url = require('url');

module.exports = class Request {
    constructor(request) {
        const _url = url.parse(request.url);

        /** @type {string} */
        this.accept = request.headers.accept;

        /** @type {string} */
        this.acceptLanguage = request.headers['accept-language'];

        /** @type {string} */
        this.dnt = request.headers['dnt'];

        this.headers = request.headers;

        /** @type {string} */
        this.host = request.headers['host'];

        /** @type {string} */
        this.method = request.method.toLowerCase();

        /** @type {string} */
        this.path = _url.pathname;

        this.query = querystring.parse(_url.query);

        /** @type {string} */
        this.userAgent = request.headers['user-agent'];
    }
};
