@becquerel/framework
====================
[![npm Version][NPM VERSION BADGE]][NPM PAGE]
[![GitHub License][LICENSE BADGE]][LICENSE PAGE]
[![Build Status][BUILD BADGE]][BUILD PAGE]

Yet another web framework experiment.

Install
-------
```sh
$ npm install --save @becquerel/framework  # Or alternately: `yarn add @becquerel/framework`
```

Usage
-----
```js
const Bq = require('@becquerel/framework');
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

[BUILD BADGE]: https://img.shields.io/travis/becquerel-js/framework.svg?style=flat-square
[BUILD PAGE]: https://travis-ci.org/becquerel-js/framework
[LICENSE BADGE]: https://img.shields.io/badge/license-MIT%20License-blue.svg?style=flat-square
[LICENSE PAGE]: https://github.com/becquerel-js/framework/blob/master/LICENSE
[NPM PAGE]: https://www.npmjs.com/package/@becquerel/framework
[NPM VERSION BADGE]: https://img.shields.io/npm/v/@becquerel/framework.svg?style=flat-square