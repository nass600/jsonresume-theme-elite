'use strict';

const
    gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

gulp.task('images', function () {
  return gulp.src('src/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'));
});
