(function() {
    'use strict';

    var _init = function() {
        return true;
    }

    // generate factory and return
    // according to global enviroment
    var factory = {
        init: _init
    };

    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory;
    } else {
        window.sculptor = factory;
    }
})();