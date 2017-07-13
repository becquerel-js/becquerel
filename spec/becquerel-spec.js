const Bq = require('../');
const http = require('http');
const any = jasmine.any;

describe('Bq', function () {
    beforeEach(function () {
        process.env['BQ_RUN_DISPLAY_MSG'] = 'false';
    });

    it('is a class/function', function () {
        expect(Bq).toEqual(any(Function));
    });

    describe('#route', function () {
        it('is a function', function () {
            expect(new Bq().route).toEqual(any(Function));
        });

        it('returns a function', function () {
            expect(new Bq().route()).toEqual(any(Function));
        });
    });

    describe('#routes', function () {
        it('is an object', function () {
            expect(new Bq().routes).toEqual(any(Object));
        });

        it('is instantiated without any properties', function () {
            expect(new Bq().routes).toEqual({});
        });
    });

    describe('#run', function () {
        it('is a function', function () {
            expect(new Bq().run).toEqual(any(Function));
        });

        it('returns an instance of `http.Server`', function () {
            expect(new Bq().run()).toEqual(any(http.Server));
        });
    });

    describe('#serve', function () {
        it('is a function', function () {
            expect(new Bq().serve).toEqual(any(Function));
        });
    });
});
