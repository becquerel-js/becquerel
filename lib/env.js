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
