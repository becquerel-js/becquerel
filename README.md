becquerel
=========
Yet another web framework experiment.

Install
-------
```sh
$ npm install --save becquerel  # Or alternately: `yarn add becquerel`
```

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

app.run();
```

License
-------
The MIT License (Expat). See the [license file](LICENSE) for details.