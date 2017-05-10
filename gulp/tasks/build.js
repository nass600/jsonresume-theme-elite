'use strict'

const gulp = require('gulp')
const size = require('gulp-size')
const config = require('../../config')

gulp.task('build', ['lint', 'styles', 'html', 'images', 'fonts'], function () {
  return gulp.src(config.paths.dist.all).pipe(size({title: 'build', gzip: true}))
})
