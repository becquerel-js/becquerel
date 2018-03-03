const UriTemplate = require('../lib/UriTemplate');
const any = jasmine.any;

describe('UriTemplate', function () {
    it('is a class/function', function () {
        expect(UriTemplate).toEqual(any(Function));
    });

    describe('#toString', function () {
        it('is a function', function () {
            expect(new UriTemplate().toString).toEqual(any(Function));
        });

        it('returns a string', function () {
            expect(new UriTemplate().toString()).toEqual(any(String));
        });
    });

    describe('#toArray', function () {
        it('is a function', function () {
            expect(new UriTemplate().toArray).toEqual(any(Function));
        });

        it('returns an array', function () {
            expect(new UriTemplate().toArray()).toEqual(any(Array));
        });
    });

    describe('#getVariables', function () {
        it('is a function', function () {
            expect(new UriTemplate().getVariables).toEqual(any(Function));
        });

        it('returns an empty object if the template has no variables', function () {
            expect(new UriTemplate('/cards').getVariables()).toEqual({});
        });

        it('extracts the ID of a resource', function () {
            const uriTemplate = new UriTemplate('/cards/{id}');
            const path = '/cards/jdoe';
            const expected = {id: 'jdoe'};

            expect(uriTemplate.getVariables(path)).toEqual(expected);
        });

        it('extracts the prefixed ID of a resource', function () {
            const uriTemplate = new UriTemplate('/cards/@{id}');
            const path = '/cards/@jdoe';
            const expected = {id: 'jdoe'};

            expect(uriTemplate.getVariables(path)).toEqual(expected);
        });

        it('extracts the ID of a resource and the declared action', function () {
            const uriTemplate = new UriTemplate('/cards/{id}/{action}');
            const path = '/cards/jdoe/edit';
            const expected = {id: 'jdoe', action: 'edit'};

            expect(uriTemplate.getVariables(path)).toEqual(expected);
        });

        it('returns an object', function () {
            expect(new UriTemplate().getVariables()).toEqual(any(Object));
        });
    });

    describe('#test', function () {
        it('is a function', function () {
            expect(new UriTemplate().test).toEqual(any(Function));
        });

        it('returns a positive match for a valid path', function () {
            const uriTemplate = new UriTemplate('/cards/{id}');
            const path = '/cards/jdoe';

            expect(uriTemplate.test(path)).toBe(true);
        });

        it('does not match an invalid path', function () {
            const uriTemplate = new UriTemplate('/cards/{id}');
            const path = '/cards/@/jdoe';

            expect(uriTemplate.test(path)).toBe(false);
        });

        it('does not match the same path with a deeper hierarchy', function () {
            const uriTemplate = new UriTemplate('/cards/{id}');
            const path = '/cards/jdoe/edit';

            expect(uriTemplate.test(path)).toBe(false);
        });

        it('returns a Boolean', function () {
            expect(new UriTemplate().test()).toEqual(any(Boolean));
        });
    });
});
