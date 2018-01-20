import gulp from 'gulp'
import size from 'gulp-size'
import fs from 'fs'
import cssImport from 'gulp-cssimport'
import gulpLoadPlugins from 'gulp-load-plugins'
import eslint from 'gulp-eslint'
import gulpStylelint from 'gulp-stylelint'
import lazypipe from 'lazypipe'
import config from '../../config'

const $ = gulpLoadPlugins()

/**
 * Preprocess Sass files
 */
gulp.task('styles', () => {
  return gulp.src(config.paths.styles.all)
    .pipe($.plumber())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe(cssImport())
    .pipe($.autoprefixer({browsers: ['last 1 version']}))
    .pipe(gulp.dest(config.paths.styles.dest))
})

/**
 * Generate html file
 */
gulp.task('html', () => {
  let cssChannel = lazypipe().pipe($.csso)

  return gulp.src([config.paths.views.all])
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', cssChannel()))
    .pipe($.useref({searchPath: '{src, .}'}))
    .pipe(gulp.dest(config.paths.views.dest))
})

/**
 * Image minification
 */
gulp.task('images', () => {
  return gulp.src(config.paths.images.all)
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(config.paths.images.dest))
})

/**
 * Copy fonts
 */
gulp.task('fonts', () => {
  return gulp.src(config.paths.fonts.all)
    .pipe(gulp.dest(config.paths.fonts.dest))
})

/**
 * Lint JS files
 */
gulp.task('lint:js', () => {
  return gulp.src([config.paths.js.all, `!${config.paths.vendor.all}`, `!${config.paths.dist.all}`])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

/**
 * Lint Sass files
 */
gulp.task('lint:sass', () => {
  return gulp
    .src(config.paths.styles.all)
    .pipe(gulpStylelint({
      failAfterError: true,
      reporters: [
        {formatter: 'string', console: true}
      ]
    }))
})

/**
 * Main app build
 */
gulp.task('build', ['styles', 'html', 'images', 'fonts'], () => {
  if (!fs.existsSync('resume.json')) {
    fs.createReadStream('resume-sample.json').pipe(fs.createWriteStream('resume.json'))
  }

  return gulp.src(config.paths.dist.all).pipe(size({title: 'build', gzip: true}))
})
