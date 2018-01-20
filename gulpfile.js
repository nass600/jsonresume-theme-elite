import gulp from 'gulp'
import requireDir from 'require-dir'
import del from 'del'
import config from './config'

requireDir('./gulp/', {recurse: true})

/**
 * Clean previously generated files
 */
gulp.task('clean', del.bind(null, [config.paths.styles.cache, config.paths.dist.dir]))

/**
 * Default task: Build
 */
gulp.task('default', ['clean'], () => gulp.start('build'))
