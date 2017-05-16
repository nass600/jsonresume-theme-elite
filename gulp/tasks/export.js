'use strict'

const gulp = require('gulp')
const args = require('yargs').argv
const exec = require('child_process').exec
const packageJson = require('../../package.json')
const config = require('../../config.js')
const elite = require('../..')

gulp.task('export', ['build', 'link'], function (cb) {
  let format = args.format || 'pdf'
  let pageFormat = args.pageFormat || 'Letter'

  if (format === 'pdf' && pageFormat) {
    elite.exportPdf(config.names.resume.data, pageFormat)
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
