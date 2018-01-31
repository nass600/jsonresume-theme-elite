module.exports = {
  paths: {
    dist: {
      dir: 'dist',
      all: 'dist/**/*'
    },
    vendor: {
      all: 'node_modules/**'
    },
    views: {
      all: 'src/views/**/*.hbs',
      dest: 'dist/views',
      entry: 'dist/views/resume.hbs',
      partials: 'dist/views/partials/**/*.hbs'
    },
    images: {
      all: 'src/images/**/*.svg',
      dest: 'dist/images'
    },
    fonts: {
      all: 'src/fonts/**/*',
      dest: 'dist/fonts'
    },
    styles: {
      cache: '.sass-cache',
      all: 'src/scss/**/*.scss',
      dest: 'dist/css',
      entry: 'dist/css/elite.css'
    },
    js: {
      all: '**/*.js'
    },
    themeConfig: 'theme-config.json'
  },
  names: {
    resume: {
      data: 'resume.json',
      dest: 'resume',
      pdf: './resume.pdf'
    }
  }
}
