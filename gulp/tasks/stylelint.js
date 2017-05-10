const gulp = require('gulp')
const gulpStylelint = require('gulp-stylelint')
const config = require('../../config')

gulp.task('stylelint', function lintCssTask () {
  return gulp
    .src(config.paths.styles.all)
    .pipe(gulpStylelint({
      failAfterError: true,
      reporters: [
        {formatter: 'string', console: true}
      ]
    }))
})
