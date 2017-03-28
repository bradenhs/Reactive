module.exports = function(source) {
  return `
  var React = require('react')
  var MUI = require('material-ui')
  var ReactiveComponent = require('fnx/react').default
  ${source}
  `
}