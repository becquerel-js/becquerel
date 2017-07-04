becquerel
=========
Yet another web framework experiment.

Example
-------
```js
const Bq = require('becquerel');
const app = new Bq();

app.route('/', {
    get: (response) => {
        response.write('Hello route!');
    }
});

app.route('/hello', {
    get: (response) => {
        response.setHeader('Content-Type', 'text/html');
        response.write('<p>Hello world!</p>');
    }
});

app.listen(8080);
```
