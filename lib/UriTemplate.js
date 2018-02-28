/**
 * @see https://tools.ietf.org/html/rfc6570
 */
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

    /**
     * Get a collection of component variable matcher objects.
     *
     * @access private
     * @return {Object}
     */
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

    /**
     * Extract the values from the provided path as a dictionary.
     *
     * @param {string} path
     * @return {Object}
     */
    getVariables(path = '') {
        const components = path.trim().split('/');
        const varParsers = this._getVarParsers();

        return components.reduce((accumulator, component, position) => {
            const parser = varParsers.find(parser => parser.position === position);

            if (!parser) {
                return accumulator;
            }

            const value = parser.regex.exec(component)[1];

            return {...accumulator, [parser.name]: value};
        }, {});
    }

    /**
     * Test to determine if the provided path is a match for the URI template.
     *
     * @param {string} path
     * @return {boolean}
     */
    test(path = '') {
        const template = this.toString();
        const pattern = '^' + template.replace(/\//g, '\\/')
            .replace(/{.+}/g, '[a-zA-Z\\.\\-_]+') + '$';
        const regex = new RegExp(pattern);

        return regex.test(path);
    }
};
