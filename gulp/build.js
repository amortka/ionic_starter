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
        './app/**/*.html'
    ],
    scripts: [
        './app/**/*.js',
        '!./app/lib/**/*.js'
    ],
    app: './app',
    lib: './app/lib',
    dist: './www',
    tmp: './.tmp'
};


gulp.task('clean', function () {
    del([
        paths.tmp,
        paths.dist
    ]);
});

gulp.task('styles', function () {
    return gulp.src(paths.sass)
        .pipe($.sass({
            errLogToConsole: true
        }))
        .pipe(gulp.dest(paths.tmp + '/css/'))
        .pipe($.minifyCss({
            keepSpecialComments: 0
        }))
        .pipe($.rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest(paths.tmp + '/css/'));
});

gulp.task('scripts', function () {
    return gulp.src(paths.scripts)
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.size());
});


gulp.task('html', function () {
    var target = gulp.src('./app/index.html');
    var source = gulp.src(paths.scripts);

    return target
        .pipe($.inject(source, {
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
        gulp.start('scripts');
    });
    $.watch(injectables, function () {
        gulp.start('html');
    });
});


gulp.task('build', ['styles', 'scripts', 'html'], function () {});

gulp.task('dist', ['build'], function () {

    var filterJS = $.filter(['**/*.js', '!lib/**/*.*'], {restore: true});
    var filterIndex = $.filter(['index.html'], {restore: true});

    return gulp.src([
        './app/**/*.*',
        './.tmp/**/*.*'
    ])
        .pipe(filterJS)
        .pipe($.concat('app.min.js'))
        .pipe($.ngAnnotate({
             remove: true,
             add: true,
             single_quotes: true
         }))
//        .pipe($.uglify())
        .pipe(gulp.dest(paths.dist))
        .pipe(filterJS.restore)
        .pipe(filterIndex)
        .pipe($.inject(gulp.src('www/app.min.js'), {
            read: false,
            addRootSlash: false,
            relative: false,
            ignorePath: 'www',
            starttag: '<!-- inject:partials:{{ext}} -->'
        }))
        .pipe(filterIndex.restore)
        .pipe(gulp.dest(paths.dist));
});
