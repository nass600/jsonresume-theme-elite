'use strict';

const
    gulp = require('gulp'),
    fs = require('fs'),
    $ = require('gulp-load-plugins')();

gulp.task('build', ['styles', 'html', 'images', 'fonts', 'extras'], function () {
    return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});
