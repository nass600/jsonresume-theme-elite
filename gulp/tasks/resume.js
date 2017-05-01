'use strict';
const
    gulp = require('gulp'),
    exec = require('child_process').exec;

gulp.task('resume', function (cb) {
    let command = 'resume serve --silent -d dist';

    exec(command, function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});
