const pluralize = require('pluralize')
const moment = require('moment')

module.exports = {
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
}