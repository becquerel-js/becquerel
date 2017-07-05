becquerel
=========
Yet another web framework experiment.

Usage
-----
```js
const Bq = require('becquerel');
const app = new Bq();

app.route('/', {
    get: (request, response) => {
        response.json = {hello: 'world'};
    }
});

app.route('/hello', {
    get: (request, response) => {
        response.html = '<p>...world</p>';
    }
});

app.listen(8080);
```
