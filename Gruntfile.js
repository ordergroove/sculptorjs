"use strict"
module.exports = function(grunt) {
    grunt.initConfig({
        karma: {
            options: {
                configFile: 'karma.conf.js',
                singleRun: true,
                autoWatch: false,
                browsers: ['PhantomJS']
            },
            main: {}
        }
    });
    grunt.registerTask('test', function () {
        grunt.task.run(['karma:main']);
    });
};
