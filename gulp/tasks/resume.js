'use strict'

const gulp = require('gulp')
const exec = require('child_process').exec
const config = require('../../config')

gulp.task('resume', function (cb) {
  let command = `node_modules/.bin/resume serve --silent -d ${config.paths.dist.dir}`

  exec(command, function (err, stdout, stderr) {
    console.log(stdout)
    console.log(stderr)
    cb(err)
  })
})
