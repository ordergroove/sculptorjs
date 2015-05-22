(function() {
    var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    less = require('gulp-less'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint');

    // less task
    gulp.task('styles', function(){
        return gulp.src('src/styles/site.less')
            .pipe(less())
            .pipe(gulp.dest('assets/styles'))
            .pipe(minifycss())
            .pipe(rename({
                suffix : '.min'
            }))
            .pipe(gulp.dest('assets/styles'));
    });

    // js task
    gulp.task('scripts', ['lint'], function(){
        return gulp.src('src/scripts/site.js')
            .pipe(uglify())
            .pipe(rename({
                suffix : '.min'
            }))
            .pipe(gulp.dest('assets/scripts'));
    });

    // jshint
    gulp.task('lint', function(){
        return gulp.src('src/scripts/site.js')
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'))
            .pipe(jshint.reporter('fail'));
    });

    // DEFAULT GULP TASK
    gulp.task('default', [ 'scripts', 'styles' ]);

    // watch task
    gulp.task('watch', function() {
        gulp.watch('src/**/*.less', [ 'styles']);
        gulp.watch('src/**/*.js', [ 'scripts']);
    });
})();