module.exports = class UriTemplate {
    /**
     * Creates an instance of `UriTemplate`.
     *
     * @param {string} uriTemplate
     * @see https://www.rfc-editor.org/rfc/rfc6570.txt
     */
    constructor(uriTemplate = '') {
        this[Symbol.for('string')] = uriTemplate.trim();
        this[Symbol.for('array')] = this[Symbol.for('string')].split('/');
    }

    /**
     * Returns the string representation of the URI template.
     *
     * @return {string}
     */
    toString() {
        return this[Symbol.for('string')];
    }

    /**
     * Returns the hierarchical path components represented as an array.
     *
     * @return {Array<string>}
     */
    toArray() {
        return this[Symbol.for('array')];
    }

    _getVarParsers() {
        const varRegEx = /{(.+)}/;

        return this.toArray().reduce((accumulator, component, position) => {
            if (!varRegEx.test(component)) {
                return accumulator;
            }

            const varName = varRegEx.exec(component)[1];

            return [...accumulator, {name: varName, position, regex: /(.+)/}];
        }, []);
    }

    getVars(path = '') {
        const components = path.trim().split('/');
        const varParsers = this._getVarParsers();

        return components.reduce((accumulator, component, position) => {
            const parser = varParsers.find(p => p.position === position);

            if (!parser) {
                return accumulator;
            }

            const value = parser.regex.exec(component)[1];

            return {...accumulator, [parser.name]: value};
        }, {});
    }

    test(path = '') {
        const template = this.toString();
        const pattern = '^' + template.replace(/\//g, '\\/').replace(/{.+}/g, '[a-zA-Z\\.\\-_]+') + '$';
        const regex = new RegExp(pattern);

        return regex.test(path);
    }
};
