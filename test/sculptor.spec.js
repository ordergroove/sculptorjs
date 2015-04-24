(function() {
    'use strict';

    var sculptor = require('../src/sculptor');

    describe('Primitive tests', function() {
        it('init function available', function() {
            expect(typeof sculptor.init).toBe('function');        
        });
    });
})();