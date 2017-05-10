const gulp = require('gulp')
const exec = require('child_process').exec

gulp.task('link', function (cb) {
  let command = 'npm link'

  exec(command, function (err, stdout, stderr) {
    console.log(stdout)
    console.log(stderr)
    cb(err)
  })
})
