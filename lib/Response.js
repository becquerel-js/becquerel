module.exports = class Response {
    constructor(response) {
        this._body = '';
        this._response = response;
    }

    get body() {
        return this._body;
    }

    set body(data) {
        this._body = data;
    }

    get contentType() {
        return this._response.getHeader('Content-Type');
    }

    set contentType(type) {
        this._response.setHeader('Content-Type', type);
    }

    get json() {
        return JSON.parse(this.body);
    }

    set json(data) {
        this.contentType = 'application/json; charset=utf-8';
        this.body = JSON.stringify(data, ' ', 4);
    }

    get html() {
        return this.body;
    }

    set html(data) {
        this.contentType = 'text/html; charset=utf-8';
        this.body = data;
    }

    send() {
        this.write();
        this._response.end();
    }

    get statusCode() {
        return this._response.statusCode;
    }

    set statusCode(code) {
        this._response.statusCode = code;
    }

    get text() {
        return this.body;
    }

    set text(data) {
        this.contentType = 'text/plain; charset=utf-8';
        this.body = data;
    }

    write() {
        const body = this.body;
        this.body = '';

        this._response.write(body);
    }
};
