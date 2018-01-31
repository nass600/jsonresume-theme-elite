const fs = require('fs')
const path = require('path')
const handlebars = require('handlebars')
const handlebarsWax = require('handlebars-wax')
const Swag = require('swag')
const helpers = require('./src/js/helpers')
const config = require('./build/config')
const themeConfig = require('./theme-config')

Swag.registerHelpers(handlebars)
handlebars.registerHelper(helpers)

function render (resume, pageFormat) {
  let css = fs.readFileSync(path.join(__dirname, config.paths.styles.entry), 'utf-8')
  let icons = fs.readFileSync(path.join(__dirname, config.paths.images.dest, 'images.svg'), 'utf-8')
  let resumeTemplate = fs.readFileSync(path.join(__dirname, config.paths.views.entry), 'utf-8')
  let Handlebars = handlebarsWax(handlebars)

  Handlebars.partials(path.join(__dirname, config.paths.views.partials))

  return Handlebars.compile(resumeTemplate)({
    themeConfig,
    icons,
    css,
    resume,
    format: pageFormat || 'Letter'
  })
}

function exportPdf (resumeFile, pageFormat) {
  let resume = require(path.join(__dirname, resumeFile))
  const pdf = require('html-pdf')
  const template = render(resume, pageFormat)

  pdf.create(template, {format: pageFormat}).toFile(config.names.resume.pdf, function (err, res) {
    if (err) return console.log(err)
  })
}

module.exports = {
  render: render,
  exportPdf: exportPdf
}
