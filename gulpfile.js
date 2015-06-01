(function() {
    'use strict';

    var gulp = require('gulp'),
        gutil = require('gulp-util'),
        less = require('gulp-less'),
        rename = require('gulp-rename'),
        concat = require('gulp-concat-util'),
        karma = require('gulp-karma'),
        jshint = require('gulp-jshint'),
        jscs = require('gulp-jscs'),
        uglify = require('gulp-uglify'),
        browserify = require('browserify'),
        source = require('vinyl-source-stream'),
        del = require('del'),
        pkg = require('./package.json');

    var projectName = pkg.title.toLowerCase(),
        banner = '// ' + projectName + ' - v' + pkg.version + ' - ' + pkg.license + ' License' +
            '\n// ' +  pkg.description +
            '\n// ' +  pkg.copyright + ' (c) ' + pkg.author + '\n\n';

    // paths
    var paths = {
        src: './src/' + projectName + '.js',
        dist: './dist/' + projectName + '.js',
        spec: './test/' + projectName + '.spec.js',
        output: './dist',
        sculptores: gutil.env.sculpt ? './sculptores' : './dist'
    };

    if (gutil.env.sculpt) {
        gutil.log(gutil.colors.magenta('building custom version: ' + gutil.env.sculpt ));
    }

    gulp.task('hint', function() {
        return gulp.src([ paths.src, paths.spec ])
            .pipe(jscs())
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'))
            .pipe(jshint.reporter('fail'));
    });

    gulp.task('browserify:test', [ 'hint' ], function() {
        return browserify({
                entries:[ paths.spec ],
                standalone: projectName
            })
            .bundle()
            .pipe(source('temp_spec.js'))
            .pipe(gulp.dest('./'));
    });

    gulp.task('browserify:src', [ 'test' ], function() {
        return browserify({
                entries:[ paths.src ],
                standalone: projectName
            })
            .bundle()
            .pipe(source(projectName + '.js'))
            .pipe(gulp.dest('./dist/'));
    });

    gulp.task('test', [ 'browserify:test' ], function() {
        return gulp.src('./temp_spec.js')
            .pipe(karma({configFile: 'test/karma.conf.js'}));
    });

    gulp.task('less', function() {
        return gulp.src('./src/' + projectName + '.less')
            .pipe(less())
            // if sculpt flag defined rename with custom flag
            .pipe(gutil.env.sculpt ? rename({ suffix: '-' + gutil.env.sculpt }) : gutil.noop())
            .pipe(gulp.dest(paths.sculptores));
    });

    gulp.task('build', [ 'browserify:src', 'less' ], function() {
        // test and delete browserified spec file
        del('./temp_spec.js');

        return gulp.src(paths.dist)
            .pipe(concat.header(banner))
            .pipe(gulp.dest(paths.output))
            .pipe(uglify())
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest(paths.output));
    });

    gulp.task('default', [ 'build' ]);
})();