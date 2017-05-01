'use strict';

const
    gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

gulp.task('fonts', function () {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));
});
