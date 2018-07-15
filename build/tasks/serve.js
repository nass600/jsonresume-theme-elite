import gulp from 'gulp'
import { exec } from 'child_process'
import browserSync from 'browser-sync'
import config from '../config'

const browserSyncInstance = browserSync.create()
/**
 * Serve Resume
 */
gulp.task('resume', cb => {
  let command = `node_modules/.bin/resume serve --silent -d ${config.paths.dist.dir}`

  exec(command, function (err, stdout, stderr) {
    console.log(stdout)
    console.log(stderr)
    cb(err)
  })
})

/**
 * Watch for changes
 */
gulp.task('watch', () => {
  let ports = {
    resumeCli: 4000,
    browserSync: 4001
  }

  setTimeout(function () {
    browserSyncInstance.init({
      proxy: 'localhost:' + ports.resumeCli,
      reloadDelay: 300,
      port: ports.browserSync
    })

    // watch for changes
    gulp.watch([
      config.paths.dist.all,
      '!dist/index.html',
      config.names.resume.data
    ]).on('change', browserSyncInstance.reload)

    gulp.watch(config.paths.views.all, ['html'])
    gulp.watch(config.paths.images.all, ['images'])
    gulp.watch(config.paths.styles.all, ['styles'])
  }, 2500)
})

gulp.task('serve', ['resume', 'watch'])
