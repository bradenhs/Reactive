var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: {
    dependencies: Object.keys(require('../package.json').dependencies || {}),
  },
  output: {
    path: path.resolve('./build'),
    filename: '[name].bundle.js',
    library: 'dependencies',
  },
  plugins: [
    new webpack.DllPlugin({
      path: 'webpack/generated/dependencies-manifest.json',
      name: 'dependencies'
    }),
  ],
}