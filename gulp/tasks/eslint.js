'use strict'

const gulp = require('gulp')
const eslint = require('gulp-eslint')
const config = require('../../config')

gulp.task('eslint', function () {
  return gulp.src([config.paths.js.all, `!${config.paths.vendor.all}`, `!${config.paths.dist.all}`])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})
