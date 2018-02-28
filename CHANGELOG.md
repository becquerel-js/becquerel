Changelog
=========
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

[Unreleased]
------------
### Added
- Added `BQ_DEFAULT_CHARSET`, `BQ_RUN_DEFAULT_PORT`, and `BQ_RUN_DISPLAY_MSG` config environment variables.
- Added more ESDoc comments.
- Added async callback support to `Bq.prototype.serve`.
- Implemented initial basic support of IETF URI templates.

### Changed
- The required Node version is now `>=8.6`.

[0.3.0] - 2017-07-13
--------------------
### Added
- Added `query` parameter to the `Request` class.
- Added `dnt`, `host`, and `userAgent` properties to the `Request` class.
- Added `headers` property to the `Request` class.
- Added `jasmine` tests.

### Removed
- Removed `chalk` package dependency.

[0.2.0] - 2017-07-05
--------------------
### Added
- Added "Install" section in readme.
- Added "License" section in readme.

### Changed
- Updated the changelog format.
- Updated the usage section on the readme.
- Route callback functions now receive a `request` and `response` argument.
- Changed the `Bq.prototype.listen` method to `Bq.prototype.run`.

0.1.0 - 2017-07-04
------------------
### Added
- Initial release.

[Unreleased]: https://github.com/becquerel-js/framework/compare/v0.3.0...HEAD
[0.3.0]: https://github.com/becquerel-js/framework/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/becquerel-js/framework/compare/v0.1.0...v0.2.0
