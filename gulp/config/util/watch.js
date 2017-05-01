'use strict';

const
    gulp = require('gulp'),
    browserSync = require('browser-sync').create();

gulp.task('watch', function() {
    let ports = {
        resumeCli: 4000,
        browserSync: 4001
    };

    // Prevent hanging white page by setting an arbitrary timeout
    //  to give the `resume` task enough time to start up
    setTimeout(function() {
        browserSync.init({
            proxy: 'localhost:' + ports.resumeCli,    //resume-cli port
            reloadDelay: 300,
            port: ports.browserSync
        });

        // watch for changes
        gulp.watch([
            'dist/**/*',
            'resume.json'
        ]).on('change', browserSync.reload);

        gulp.watch('src/views/**/*.hbs', ['html']);
        gulp.watch('src/images/**/*', ['images']);
        gulp.watch('src/scss/**/*.scss', ['styles']);
    }, 2500);
});
