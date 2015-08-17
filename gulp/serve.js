'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var util = require('util');
var browserSync = require('browser-sync').create();

function browserSyncInit(baseDir, files, browser, port) {
    var routes = null;

    browser = browser === undefined ? 'default' : browser;
    port = port === undefined ? 6060 : port;

    browserSync.init({
        startPath: '/',
        server: {
            baseDir: baseDir
        },
        files: files,
        port: port,
        browser: browser
    });
}

gulp.task('serve', ['watch'], function() {
  browserSyncInit([
      '.tmp',
      'app'
  ], [
      '.tmp/**/*.css',
      '.tmp/index.html',
      'app/common/**/*.html',
      'app/common/**/*.js',
      'app/components/**/*.html',
      'app/components/**/*.js',
      'app/pages/**/*.html',
      'app/pages/**/*.js'
  ]);

});


gulp.task('serve-dist', function() {
    browserSyncInit([
        'www'
    ], []);

});
