(function() {
    'use strict';

    var gulp = require('gulp'),
        karma = require('gulp-karma'),
        browserify = require('browserify'),
        source = require('vinyl-source-stream'),
        pkge = require('./package.json');

    // paths
    var paths = {
        src: './src/' + pkge.name + '.js',
        spec: './test/' + pkge.name + '.spec.js',
        output: './'
    }

    gulp.task('browserify:test', function() {
        return browserify({entries:[ paths.spec ]})
            .bundle()
            .pipe(source('spec.js'))
            .pipe(gulp.dest(paths.output));
    });

    gulp.task('test', [ 'browserify:test' ], function() {
        return gulp.src('./spec.js')
            .pipe(karma({configFile: 'test/karma.conf.js'}));
    });

    gulp.task('default', [ 'test' ]);
})();