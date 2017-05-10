'use strict'

const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const config = require('../../config')

gulp.task('watch', function () {
  let ports = {
    resumeCli: 4000,
    browserSync: 4001
  }

  setTimeout(function () {
    browserSync.init({
      proxy: 'localhost:' + ports.resumeCli,
      reloadDelay: 300,
      port: ports.browserSync
    })

    // watch for changes
    gulp.watch([
      config.paths.dist.all,
      config.names.resume.data
    ]).on('change', browserSync.reload)

    gulp.watch(config.paths.views.all, ['html'])
    gulp.watch(config.paths.images.all, ['images'])
    gulp.watch(config.paths.styles.all, ['styles'])
  }, 2500)
})
