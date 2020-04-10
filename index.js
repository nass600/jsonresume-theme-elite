const fs = require('fs')
const path = require('path')
const handlebars = require('handlebars')
const handlebarsWax = require('handlebars-wax')
const Swag = require('swag')
const pluralize = require('pluralize')
const moment = require('moment')
const config = require('./build/config')
const defaultThemeConfig = require('./theme-config')

Swag.registerHelpers(handlebars)
handlebars.registerHelper({
  formatDate: function (date) {
    if (!date) {
      return 'now'
    }
    return moment(date).format('MMM YYYY')
  },
  dateDiff: function (startDate, endDate) {
    let text = ''
    startDate = startDate ? moment(startDate) : moment()
    startDate.startOf('month')
    endDate = endDate ? moment(endDate) : moment()
    endDate.add(1, 'month').startOf('month')
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
  },
  isArray: function (item) {
    return Array.isArray(item);
  }
})

function render (resume, pageFormat, themeConfig) {
  let css = fs.readFileSync(path.join(__dirname, config.paths.styles.entry), 'utf-8')
  let icons = fs.readFileSync(path.join(__dirname, config.paths.images.dest, 'images.svg'), 'utf-8')
  let resumeTemplate = fs.readFileSync(path.join(__dirname, config.paths.views.entry), 'utf-8')
  let Handlebars = handlebarsWax(handlebars)

  Handlebars.partials(path.join(__dirname, config.paths.views.partials))

  return Handlebars.compile(resumeTemplate)({
    themeConfig: Object.assign(defaultThemeConfig, themeConfig),
    icons,
    css,
    resume,
    format: pageFormat || 'Letter'
  })
}

function exportPdf (dataFile, pdfFile, pageFormat, themeConfig) {
  let resume = require(dataFile)
  const pdf = require('html-pdf')
  const template = render(resume, pageFormat, themeConfig)

  pdf.create(template, {format: pageFormat}).toFile(pdfFile, function (err, res) {
    if (err) return console.log(err)
  })
}

module.exports = {
  render: render,
  exportPdf: exportPdf
}
