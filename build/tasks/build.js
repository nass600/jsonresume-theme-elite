import gulp from 'gulp'
import size from 'gulp-size'
import fs from 'fs'
import path from 'path'
import cssImport from 'gulp-cssimport'
import gulpLoadPlugins from 'gulp-load-plugins'
import eslint from 'gulp-eslint'
import gulpStylelint from 'gulp-stylelint'
import lazypipe from 'lazypipe'
import config from '../config'
import svgstore from 'gulp-svgstore'
import svgmin from 'gulp-svgmin'
import sourcemaps from 'gulp-sourcemaps'

const $ = gulpLoadPlugins()

/**
 * Generate SVG symbols
 */
gulp.task('images', () => {
  return gulp
    .src(config.paths.images.all)
    .pipe(svgmin(file => {
      const prefix = path.basename(file.relative, path.extname(file.relative))

      return {
        plugins: [{
          cleanupIDs: {
            prefix: prefix + '-',
            minify: true
          }
        }]
      }
    }))
    .pipe(svgstore())
    .pipe(gulp.dest(config.paths.images.dest))
})

/**
 * Preprocess Sass files
 */
gulp.task('styles', () => {
  return gulp.src(config.paths.styles.all)
    .pipe($.plumber())
    .pipe(sourcemaps.init())
    .pipe($.sass({
      includePaths: ['./node_modules/']
    }).on('error', $.sass.logError))
    .pipe(cssImport())
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'iOS 8.1'],
      flexbox: true,
      add: true
    }))
    .pipe(sourcemaps.write())
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
  if (!fs.existsSync(config.names.resume.data)) {
    fs.createReadStream('resume-sample.json').pipe(fs.createWriteStream(config.names.resume.data))
  }

  return gulp.src(config.paths.dist.all).pipe(size({title: 'build', gzip: true}))
})
