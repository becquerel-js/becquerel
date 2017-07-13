/**
 * If only the `name` parameter is provided this function acts as a getter for
 * `process.env`. However if `name` and `value` are provide it acts as a setter
 * for `process.env`. When acting as a getter the function will try to call
 * `JSON.parse()` on the value cast to lowercase _(to convert `'true'` to `true`,
 * `'TRUE'` to `true`, `'1'` to `1`, etc.)_ and if that fails it will return the
 * value verbatim.
 *
 * @param {string} name - The envvar name to interact with.
 * @param {*} [value] - If provided sets the value of the `name` envvar.
 * @return {*} The parsed envvar value, regardless of if called as a getter or setter.
 * @see https://nodejs.org/api/process.html#process_process_env
 */
module.exports = function env(name, value) {
    if (value !== undefined) {
        process.env[name] = value;
    }

    const _value = process.env[name];

    try {
        return JSON.parse(_value.toLowerCase());
    } catch (_) {
        return _value;
    }
};
