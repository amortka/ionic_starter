'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var util = require('util');


gulp.task('test', function () {
    var jsFilter = $.filter('*.js', {restore: true});

    gulp.src(['app/**/*.*', '!./app/lib/**/*.*'])
        .pipe($.debug())
        .pipe(jsFilter)
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe(jsFilter.restore)


});