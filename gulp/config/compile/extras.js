'use strict';

const
    gulp = require('gulp');

gulp.task('extras', function () {
  return gulp.src([
    'src/*.*'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});
