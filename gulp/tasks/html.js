'use strict'

const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const config = require('../../config')

gulp.task('html', function () {
  let lazypipe = require('lazypipe')
  let cssChannel = lazypipe().pipe($.csso)

  return gulp.src([config.paths.views.all])
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', cssChannel()))
    .pipe($.useref({searchPath: '{src, .}'}))
    .pipe(gulp.dest(config.paths.views.dest))
})
