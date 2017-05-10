const fs = require('fs')
const path = require('path')
const handlebars = require('handlebars')
const handlebarsWax = require('handlebars-wax')
const moment = require('moment')
const Swag = require('swag')
const config = require('./config')

Swag.registerHelpers(handlebars)

handlebars.registerHelper({
  formatDate: function (date) {
    if (typeof date === 'undefined') {
      return 'now'
    }
    return moment(date).format('MMM YYYY')
  },
  dateDiff: function (startDate, endDate) {
    startDate = moment(startDate)
    endDate = moment(endDate)
    return endDate.diff(startDate, 'years', true).toFixed(1) + ' years'
  },
  dateAgo: function (date) {
    return moment(date, 'YYYY-MM-DD').fromNow()
  },
  removeSchema: function (url) {
    return url.replace(/^.*:\/\//i, '')
  },
  sanitizeLowercase: function (str) {
    return str.replace(/[^a-z0-9]/gi, '-').toLowerCase()
  }
})

function render (resume) {
  let css = fs.readFileSync(path.join(__dirname, config.paths.styles.entry), 'utf-8')
  let resumeTemplate = fs.readFileSync(path.join(__dirname, config.paths.views.entry), 'utf-8')
  let Handlebars = handlebarsWax(handlebars)

  Handlebars.partials(path.join(__dirname, config.paths.views.partials))
  Handlebars.partials(path.join(__dirname, config.paths.views.components))

  return Handlebars.compile(resumeTemplate)({
    css: css,
    resume: resume
  })
}

module.exports = {
  render: render
}
