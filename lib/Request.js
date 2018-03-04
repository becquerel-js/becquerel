const querystring = require('querystring');
const url = require('url');

module.exports = class Request {
    /**
     * Creates an instance of `Request`.
     *
     * @param {http.IncomingMessage} incomingMessage
     * @see https://nodejs.org/api/http.html#http_class_http_incomingmessage
     */
    constructor(incomingMessage) {
        this[Symbol.for('url')] = url.parse(incomingMessage.url);

        /** @type {string} */
        this.accept = incomingMessage.headers.accept;

        /** @type {string} */
        this.acceptLanguage = incomingMessage.headers['accept-language'];

        /** @type {string} */
        this.dnt = incomingMessage.headers['dnt'];

        /** @type {Object} */
        this.headers = incomingMessage.headers;

        /** @type {string} */
        this.host = incomingMessage.headers['host'];

        /** @type {http.IncomingMessage} */
        this.incomingMessage = incomingMessage;

        /** @type {string} */
        this.method = incomingMessage.method.toLowerCase();

        /** @type {string} */
        this.path = this[Symbol.for('url')].pathname;

        /**
         * @type {Object<string, string|Array<string>>}
         * @see https://nodejs.org/api/querystring.html#querystring_querystring_parse_str_sep_eq_options
         */
        this.query = querystring.parse(this[Symbol.for('url')].query);

        /** @type {string} */
        this.userAgent = incomingMessage.headers['user-agent'];
    }

    /**
     * @type {Object}
     */
    get uriVariables() {
        return this[Symbol.for('uriVariables')] || {};
    }

    /**
     * @type {Object}
     */
    set uriVariables(uriVariables) {
        this[Symbol.for('uriVariables')] = uriVariables;
    }
};
