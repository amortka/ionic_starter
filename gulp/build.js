'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var util = require('util');

var paths = {
  sass: [
    './scss/**/*.scss'
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


gulp.task('clean', function() {
  del([
    paths.tmp,
    paths.dist
  ]);
});

gulp.task('styles', function() {
  return gulp.src('./scss/ionic.app.scss')
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

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.size());
});


gulp.task('html', function() {
  var target = gulp.src('./app/index.html');
  var source = gulp.src(paths.scripts);

  return target
    .pipe($.inject(source, {
      read: false,
      addRootSlash: false,
      relative: true,
      starttag: '<!-- inject:partials:{{ext}} -->'
    }))
    .pipe(gulp.dest(paths.tmp));
});

gulp.task('watch', ['build'], function() {
  //gulp-watch is better for watching new or deleted files
  $.watch(paths.sass, function() {
    gulp.start('sass');
  });
  $.watch(paths.scripts, function() {
    gulp.start('scripts');
    gulp.start('html');
  });
});


gulp.task('build', ['styles', 'scripts', 'html'], function() {});

gulp.task('dist', [], function() {
  return gulp.src([
      './app/**/*.*',
      './.tmp/**/*.*'
    ])
    .pipe(gulp.dest(paths.dist));
});
