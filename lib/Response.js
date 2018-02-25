const env = require('./env');

module.exports = class Response {
    /**
     * Creates an instance of `Response`.
     *
     * @param {http.ServerResponse} response
     * @see https://nodejs.org/api/http.html#http_class_http_serverresponse
     */
    constructor(response) {
        /**
         * @type {string}
         */
        this[Symbol.for('body')] = '';

        /**
         * @type {http.ServerResponse}
         * @see https://nodejs.org/api/http.html#http_class_http_serverresponse
         */
        this[Symbol.for('response')] = response;
    }

    /**
     * @type {string}
     */
    get body() {
        return this[Symbol.for('body')];
    }

    /**
     * @type {string}
     */
    set body(data) {
        this[Symbol.for('body')] = data;
    }

    /**
     * @type {string}
     */
    get contentType() {
        return this[Symbol.for('response')].getHeader('Content-Type');
    }

    /**
     * @type {string}
     */
    set contentType(type) {
        this[Symbol.for('response')].setHeader('Content-Type', type);
    }

    /**
     * @type {*}
     */
    get json() {
        return JSON.parse(this[Symbol.for('body')]);
    }

    /**
     * @type {*}
     */
    set json(data) {
        this.contentType = `application/json; charset=${env('BQ_DEFAULT_CHARSET')}`;
        this[Symbol.for('body')] = JSON.stringify(data, ' ', 4);
    }

    /**
     * @type {string}
     */
    get html() {
        return this[Symbol.for('body')];
    }

    /**
     * @type {string}
     */
    set html(data) {
        this.contentType = `text/html; charset=${env('BQ_DEFAULT_CHARSET')}`;
        this[Symbol.for('body')] = data;
    }

    /**
     * Writes the output data and calls `http.ServerResponse#end()`
     *
     * @return {boolean}
     * @see https://nodejs.org/api/http.html#http_response_end_data_encoding_callback
     */
    send() {
        this.write();

        return this[Symbol.for('response')].end();
    }

    /**
     * @type {number}
     */
    get statusCode() {
        return this[Symbol.for('response')].statusCode;
    }

    /**
     * @type {number}
     */
    set statusCode(code) {
        this[Symbol.for('response')].statusCode = code;
    }

    /**
     * @type {string}
     */
    get text() {
        return this[Symbol.for('body')];
    }

    /**
     * @type {string}
     */
    set text(data) {
        this.contentType = `text/plain; charset=${env('BQ_DEFAULT_CHARSET')}`;
        this[Symbol.for('body')] = data;
    }

    /**
     * Calls and returns the result of `http.ServerResponse#write(this.body)`
     * and resets `this.body` back to an empty string.
     *
     * @return {boolean}
     * @see https://nodejs.org/api/http.html#http_response_write_chunk_encoding_callback
     */
    write() {
        // Save a reference to the body before we reset it so we can return it.
        const body = this[Symbol.for('body')];
        this[Symbol.for('body')] = '';

        return this[Symbol.for('response')].write(body);
    }
};
