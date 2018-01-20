const fs = require('fs')
const path = require('path')
const handlebars = require('handlebars')
const handlebarsWax = require('handlebars-wax')
const moment = require('moment')
const Swag = require('swag')
const pluralize = require('pluralize')
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
    let text = ''
    startDate = moment(startDate)
    endDate = moment(endDate)
    let years = endDate.diff(startDate, 'years')
    startDate.add(years, 'years')
    let months = endDate.diff(startDate, 'months')

    if (years > 0) {
      text += `${years} ${pluralize('years', years)}`
    }
    if (months > 0) {
      if (years > 0) {
        text += ' '
      }
      text += `${months} ${pluralize('months', months)}`
    }

    return text
  },
  dateAgo: function (date) {
    return moment(date, 'YYYY-MM-DD').fromNow()
  },
  removeSchema: function (url) {
    return url.replace(/^.*:\/\//i, '')
  },
  sanitizeLowercase: function (str) {
    return str.replace(/[^a-z0-9]/gi, '-').toLowerCase()
  },
  times: function (n, block) {
    let accum = ''
    let i = 0

    while (++i <= n) {
      accum += block.fn(i)
    }

    return accum
  }
})

function render (resume, pageFormat) {
  let css = fs.readFileSync(path.join(__dirname, config.paths.styles.entry), 'utf-8')
  let resumeTemplate = fs.readFileSync(path.join(__dirname, config.paths.views.entry), 'utf-8')
  let Handlebars = handlebarsWax(handlebars)

  Handlebars.partials(path.join(__dirname, config.paths.views.partials))

  return Handlebars.compile(resumeTemplate)({
    css: css,
    resume: resume,
    format: pageFormat || 'Letter'
  })
}

function exportPdf (resumeFile, pageFormat) {
  let resume = require(path.join(__dirname, resumeFile))
  const pdf = require('html-pdf')
  const template = render(resume, pageFormat)

  pdf.create(template, {format: pageFormat}).toFile('./resume.pdf', function (err, res) {
    if (err) return console.log(err)
  })
}

module.exports = {
  render: render,
  exportPdf: exportPdf
}
