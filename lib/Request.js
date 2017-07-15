const querystring = require('querystring');
const url = require('url');

module.exports = class Request {
    /**
     * Creates an instance of `Request`.
     *
     * @param {http.IncomingMessage} request
     * @see https://nodejs.org/api/http.html#http_class_http_incomingmessage
     */
    constructor(request) {
        const _url = url.parse(request.url);

        /** @type {string} */
        this.accept = request.headers.accept;

        /** @type {string} */
        this.acceptLanguage = request.headers['accept-language'];

        /** @type {string} */
        this.dnt = request.headers['dnt'];

        /** @type {Object} */
        this.headers = request.headers;

        /** @type {string} */
        this.host = request.headers['host'];

        /** @type {string} */
        this.method = request.method.toLowerCase();

        /** @type {string} */
        this.path = _url.pathname;

        /**
         * @type {Object<string, string|Array<string>>}
         * @see https://nodejs.org/api/querystring.html#querystring_querystring_parse_str_sep_eq_options
         */
        this.query = querystring.parse(_url.query);

        /** @type {string} */
        this.userAgent = request.headers['user-agent'];
    }
};
