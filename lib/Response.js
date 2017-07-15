module.exports = class Response {
    constructor(response) {
        /**
         * @type {string}
         */
        this._body = '';

        /**
         * @type {http.ServerResponse}
         * @see https://nodejs.org/api/http.html#http_class_http_serverresponse
         */
        this._response = response;
    }

    /**
     * @type {string}
     */
    get body() {
        return this._body;
    }

    /**
     * @type {string}
     */
    set body(data) {
        this._body = data;
    }

    /**
     * @type {string}
     */
    get contentType() {
        return this._response.getHeader('Content-Type');
    }

    /**
     * @type {string}
     */
    set contentType(type) {
        this._response.setHeader('Content-Type', type);
    }

    /**
     * @type {*}
     */
    get json() {
        return JSON.parse(this.body);
    }

    /**
     * @type {*}
     */
    set json(data) {
        this.contentType = 'application/json; charset=utf-8';
        this.body = JSON.stringify(data, ' ', 4);
    }

    /**
     * @type {string}
     */
    get html() {
        return this.body;
    }

    /**
     * @type {string}
     */
    set html(data) {
        this.contentType = 'text/html; charset=utf-8';
        this.body = data;
    }

    /**
     * Writes the output data and calls `http.ServerResponse#end()`
     *
     * @return {boolean}
     * @see https://nodejs.org/api/http.html#http_response_end_data_encoding_callback
     */
    send() {
        this.write();

        return this._response.end();
    }

    /**
     * @type {number}
     */
    get statusCode() {
        return this._response.statusCode;
    }

    /**
     * @type {number}
     */
    set statusCode(code) {
        this._response.statusCode = code;
    }

    /**
     * @type {string}
     */
    get text() {
        return this.body;
    }

    /**
     * @type {string}
     */
    set text(data) {
        this.contentType = 'text/plain; charset=utf-8';
        this.body = data;
    }

    /**
     * Calls and returns the result of `http.ServerResponse#write(this.body)`
     * and resets `this.body` back to an empty string.
     *
     * @return {boolean}
     * @see https://nodejs.org/api/http.html#http_response_write_chunk_encoding_callback
     */
    write() {
        const body = this.body;
        this.body = '';

        return this._response.write(body);
    }
};
