'use strict';

const
    gulp = require('gulp'),
    cssImport = require('gulp-cssimport'),
    $ = require('gulp-load-plugins')();

gulp.task('styles', function () {
  return gulp.src('src/scss/*.scss')
    .pipe($.plumber())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe(cssImport())
    .pipe($.autoprefixer({browsers: ['last 1 version']}))
    .pipe(gulp.dest('dist/styles'));
});
