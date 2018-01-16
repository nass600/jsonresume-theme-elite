'use strict'

const gulp = require('gulp')
const size = require('gulp-size')
const fs = require('fs')
const config = require('../../config')

gulp.task('build', ['styles', 'html', 'images', 'fonts'], function () {
  if (!fs.existsSync('resume.json')) {
    fs.createReadStream('resume-sample.json').pipe(fs.createWriteStream('resume.json'))
  }

  return gulp.src(config.paths.dist.all).pipe(size({title: 'build', gzip: true}))
})
