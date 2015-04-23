(function() {
    'use strict';

    var gulp = require('gulp'),
        browserify = require('gulp-browserify'),
        karma = require('gulp-karma'),
        pkge = require('./package.json');

    // paths
    var paths = {
        src: 'src/' + pkge.name + '.js',
        spec: 'test/' + pkge.name + '.spec.js',
        output: './'
    }

    gulp.task('test', function() {
        return gulp.src([ paths.src, paths.spec ])
            .pipe(karma({configFile: 'test/karma.conf.js'}));
    });

    gulp.task('default', [ 'test' ]);
})();