const Bq = require('../');
const any = jasmine.any;

describe('Bq', function () {
    it('is a class/function', function () {
        expect(Bq).toEqual(any(Function));
    });

    describe('.route', function () {
        it('is a function', function () {
            expect(new Bq().route).toEqual(any(Function));
        });
    });

    describe('.run', function () {
        it('is a function', function () {
            expect(new Bq().run).toEqual(any(Function));
        });
    });

    describe('.serve', function () {
        it('is a function', function () {
            expect(new Bq().serve).toEqual(any(Function));
        });
    });
});
