@becquerel/framework
====================
[![npm Version][NPM VERSION BADGE]][NPM PAGE]
[![Node.js][NODE VERSION BADGE]][NODE PAGE]
[![GitHub License][LICENSE BADGE]][LICENSE PAGE]
[![Build Status][BUILD BADGE]][BUILD PAGE]

> Yet another web framework experiment.

Install
-------
```sh
$ yarn add @becquerel/framework  # Or alternately: `npm install @becquerel/framework`
```

Usage
-----
```js
'use strict';

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

app.route('/hello/{var}', {
    get: (request, response) => {
        response.json = {valueOfVar: request.uriVariables.var};
    }
});

app.run();
```

Environment Variables
---------------------
### `BQ_DEFAULT_CHARSET` _(default: `utf-8`)_
The default charset used for framework responses.

### `BQ_RUN_DEFAULT_PORT` _(default: `8080`)_
The port that the app will bind to if `settings.port` is not passed to `#run()`.

### `BQ_RUN_DISPLAY_MSG` _(default: `true`)_
If `true` the app will display the `Now listening at <${uri}>.` message upon launch.

Testing
-------
```sh
$ yarn test # Or alternatively: `npm test`
```

License
-------
The MIT License (Expat). See the [license file](LICENSE) for details.

[BUILD BADGE]: https://img.shields.io/travis/becquerel-js/framework.svg?style=flat-square
[BUILD PAGE]: https://travis-ci.org/becquerel-js/framework
[LICENSE BADGE]: https://img.shields.io/badge/license-MIT%20License-blue.svg?style=flat-square
[LICENSE PAGE]: https://github.com/becquerel-js/framework/blob/master/LICENSE
[NODE PAGE]: https://nodejs.org/
[NODE VERSION BADGE]: https://img.shields.io/badge/node-%3E%3D7.10-%23010101.svg?style=flat-square
[NPM PAGE]: https://www.npmjs.com/package/@becquerel/framework
[NPM VERSION BADGE]: https://img.shields.io/npm/v/@becquerel/framework.svg?style=flat-square
