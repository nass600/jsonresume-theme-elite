'use strict'

const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const config = require('../../config')

gulp.task('images', function () {
  return gulp.src(config.paths.images.all)
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(config.paths.images.dest))
})
