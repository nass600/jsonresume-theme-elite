'use strict'

const gulp = require('gulp')
const args = require('yargs').argv
const exec = require('child_process').exec
const packageJson = require('../../package.json')
const config = require('../config.js')
const elite = require('../..')
const path = require('path')

/**
 * Link npm library itself
 */
gulp.task('link', function (cb) {
  let command = 'npm link'

  exec(command, function (err, stdout, stderr) {
    console.log(stdout)
    console.log(stderr)
    cb(err)
  })
})

/**
 * Unlink npm library itself
 */
gulp.task('unlink', function (cb) {
  let command = 'npm unlink'

  exec(command, function (err, stdout, stderr) {
    console.log(stdout)
    console.log(stderr)
    cb(err)
  })
})

gulp.task('export', ['build', 'link'], function (cb) {
  let format = args.format || 'pdf'
  let pageFormat = args.pageFormat || 'Letter'

  if (format === 'pdf' && pageFormat) {
    elite.exportPdf(
      path.resolve(config.names.resume.data),
      path.resolve(config.names.resume.pdf),
      pageFormat
    )
  } else {
    let command = `resume export ${config.names.resume.dest} --format ${format}`

    if (packageJson.name) {
      command += ` --theme elite`
    }

    exec(command, function (err, stdout, stderr) {
      console.log(stdout)
      console.log(stderr)
      cb(err)
      gulp.start('unlink')
    })
  }
})
