'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var util = require('util');
var _ = require('lodash');

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

/*
 flow:
 development: *.css, *.html, *.js -> .tmp/
 [styles] [html] [js]

 dist: .tmp/**.* -> dist/

 */

gulp.task('clean', function () {
    del([
        paths.tmp,
        paths.dist
    ]);
});

gulp.task('styles', function () {
    gulp.src(paths.sass)
        .pipe($.sass({
            errLogToConsole: true
        }))
        .pipe(gulp.dest(paths.tmp + '/css/'))
        .pipe($.minifyCss({
            keepSpecialComments: 0
        }))
        //.pipe($.rename({
        //    extname: '.min.css'
        //}))
        .pipe(gulp.dest(paths.dist + '/css/'))
        .pipe(gulp.dest(paths.app + '/css/'));
});

gulp.task('js-hint', function () {
    gulp.src(paths.scripts)
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.size());
});

gulp.task('js-min', function () {
    gulp.src(paths.scripts)
        .pipe($.concat('app.min.js'))
        .pipe($.ngAnnotate({
            remove: true,
            add: true,
            single_quotes: true
        }))
        .pipe(gulp.dest(paths.dist));

    gulp.src(paths.tmp + '/index.html')
        .pipe($.inject(gulp.src(paths.dist + '/app.min.js'), {
            read: false,
            addRootSlash: false,
            relative: false,
            ignorePath: 'www',
            starttag: '<!-- inject:partials:{{ext}} -->'
        }))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('index', function () {
    gulp.src('./app/index.html')
        .pipe($.inject(gulp.src(paths.scripts), {
            addRootSlash: false,
            relative: true,
            starttag: '<!-- inject:partials:{{ext}} -->'
        }))
        .pipe(gulp.dest(paths.tmp));
});

gulp.task('watch', [], function () {
    var injectables = _.union(paths.partials, paths.scripts);

    //gulp-watch is better for watching new or deleted files
    $.watch(paths.sass, function () {
        gulp.start('styles');
    });
    $.watch(paths.scripts, function () {
        gulp.start('js-hint');
    });
    $.watch(paths.scripts, function () {
        gulp.start('index');
    });

    $.watch('./app/index.html', function () {
        gulp.start('index');
    });
});


gulp.task('build', ['styles', 'js-hint', 'index'], function () {
});

gulp.task('dist', ['build', 'js-min'], function () {
    gulp.src(paths.lib)
        .pipe($.copy(paths.dist, {prefix:1}));

    gulp.src(paths.partials)
        .pipe($.copy(paths.dist, {prefix:1}));

});

