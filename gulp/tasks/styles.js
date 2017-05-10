'use strict'

const gulp = require('gulp')
const cssImport = require('gulp-cssimport')
const $ = require('gulp-load-plugins')()
const config = require('../../config')

gulp.task('styles', function () {
  return gulp.src(config.paths.styles.all)
    .pipe($.plumber())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe(cssImport())
    .pipe($.autoprefixer({browsers: ['last 1 version']}))
    .pipe(gulp.dest(config.paths.styles.dest))
})
