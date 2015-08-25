'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')(); // jshint ignore:line
var del = require('del');
var util = require('util');
var _ = require('lodash'); // jshint ignore:line

var paths = {
    sass: [
        './app/scss/**/*.scss'
    ],
    partials: [
        './app/**/*.html',
        '!./app/index.html'
    ],
    scripts: [
        './app/**/*.js',
        '!./app/lib/**/*.js'
    ],
    app: './app',
    lib: './app/lib/**/*.*',
    dist: './www',
    tmp: './.tmp'
};

gulp.task('clean', function () {
    del([
        paths.tmp,
        paths.dist
    ]);
});

gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
       .pipe($.debug())
       .pipe($.jshint())
       .pipe($.jshint.reporter('jshint-stylish'))
       .pipe($.size());
});

gulp.task('styles', function() {
    return gulp.src(paths.sass)
        .pipe($.sass({
            errLogToConsole: true
        }))
        .pipe(gulp.dest(paths.tmp + '/css/'))
        .pipe($.minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(process.env.NODE_ENV === 'production' ? $.rename({
            extname: '.min.css'
        }) : $.util.noop())
        .pipe(process.env.NODE_ENV === 'production' ? gulp.dest(paths.dist + '/css/') : $.util.noop());
});

gulp.task('js-min', function () {
    return gulp.src(paths.scripts)
        .pipe($.concat('app.min.js'))
        .pipe($.ngAnnotate({
            remove: true,
            add: true,
            single_quotes: true
        }))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('disthtml', ['js-min'], function () {
    return gulp.src('./app/index.html')
        .pipe($.inject(gulp.src(paths.dist + '/app.min.js'), {
            addRootSlash: false,
            relative: true,
            starttag: '<!-- inject:partials:{{ext}} -->'
        }))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('buildhtml', function() {
    gulp.src('./app/index.html')
        .pipe($.inject(gulp.src(paths.scripts).pipe($.sort()), {
            addRootSlash: false,
            relative: true,
            starttag: '<!-- inject:partials:{{ext}} -->'
        }))
        .pipe(gulp.dest(paths.tmp));
});

gulp.task('build', ['set-dev-node-env', 'styles', 'scripts', 'buildhtml'], function() {
    console.log('env:', process.env.NODE_ENV);
});

gulp.task('build-dist', ['set-prod-node-env', 'styles'], function () {
//gulp.task('dist', ['set-prod-node-env', 'styles'], function () {

    console.log('env:', process.env.NODE_ENV);

    gulp.src(paths.lib)
        .pipe($.copy(paths.dist, {prefix:1}));

    gulp.src(paths.partials)
        .pipe($.copy(paths.dist, {prefix:1}));
});


gulp.task('dist', ['set-prod-node-env', 'build-dist'], function() {

});

gulp.task('set-dev-node-env', function() {
    process.env.NODE_ENV = 'development';
});

gulp.task('set-prod-node-env', function() {
    process.env.NODE_ENV = 'production';
});

gulp.task('watch', ['build'],function() {
    $.watch(paths.scripts, function () {
        gulp.start('scripts');
        gulp.start('buildhtml');
    });
    $.watch(paths.sass, function () {
        gulp.start('styles');
    });
    $.watch('./app/index.html', function () {
        gulp.start('buildhtml');
    });
});
