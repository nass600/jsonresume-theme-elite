'use strict'

const gulp = require('gulp')
const config = require('../../config')

gulp.task('fonts', function () {
  return gulp.src(config.paths.fonts.all)
    .pipe(gulp.dest(config.paths.fonts.dest))
})
