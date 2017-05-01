const fs = require("fs");
const path = require('path');
const handlebars = require("handlebars");
const handlebarsWax = require('handlebars-wax');
const moment = require("moment");
const Swag = require('swag');

Swag.registerHelpers(handlebars);

handlebars.registerHelper({
  formatDate: function(date) {
    if (typeof date == 'undefined') {
      return 'now'
    }
    return moment(date).format('MMM YYYY');
  },
  dateDiff: function(startDate, endDate) {
    startDate = moment(startDate)
    endDate = moment(endDate)
    return endDate.diff(startDate, 'years', true).toFixed(1) + ' years';
  },
  dateAgo: function (date) {
    return moment(date, "YYYY-MM-DD").fromNow()
  },
  removeSchema: function (url) {
    return url.replace(/^.*:\/\//i, '');
  }
});

function render(resume) {
  let dir = __dirname + '/dist',
    css = fs.readFileSync(dir + '/styles/main.css', 'utf-8'),
    resumeTemplate = fs.readFileSync(dir + '/views/resume.hbs', 'utf-8');

  let Handlebars = handlebarsWax(handlebars);

  Handlebars.partials(dir + '/views/partials/**/*.{hbs,js}');
  Handlebars.partials(dir + '/views/components/**/*.{hbs,js}');

  return Handlebars.compile(resumeTemplate)({
    css: css,
    resume: resume
  });
}


module.exports = {
  render: render
};
