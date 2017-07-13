const Bq = require('../');
const http = require('http');
const any = jasmine.any;

describe('Bq', function () {
    beforeEach(function () {
        process.env['BQ_RUN_MSG'] = 'false';
    });

    it('is a class/function', function () {
        expect(Bq).toEqual(any(Function));
    });

    describe('.route', function () {
        it('is a function', function () {
            expect(new Bq().route).toEqual(any(Function));
        });

        it('returns a function', function () {
            expect(new Bq().route()).toEqual(any(Function));
        });
    });

    describe('.run', function () {
        it('is a function', function () {
            expect(new Bq().run).toEqual(any(Function));
        });

        it('returns an instance of `http.Server`', function () {
            expect(new Bq().run()).toEqual(any(http.Server));
        });
    });

    describe('.serve', function () {
        it('is a function', function () {
            expect(new Bq().serve).toEqual(any(Function));
        });
    });
});
