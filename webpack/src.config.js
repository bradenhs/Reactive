var webpack = require('webpack');
var path = require('path');
var TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;

var PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/index.ts',
  devtool: PRODUCTION ? false : 'source-map',
  performance: {
    hints: PRODUCTION ? 'warning' : false,
  },
  output: {
    path: path.resolve('build'),
    publicPath: '/build/',
    filename: 'src.bundle.js',
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    plugins: [
      new TsConfigPathsPlugin(),
    ]
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        loader: 'tslint-loader',
        exclude: /(node_modules)/,
      },
      {
        test: /\.tsx?$/, use: 'auto-import-loader',
        exclude: /(node_modules)/
      },
      {
        test: /\.tsx?$/, use: 'awesome-typescript-loader',
        exclude: /(node_modules)/,
      },
    ],
  },
  resolveLoader: {
    alias: {
      'auto-import-loader': path.join(__dirname, './autoImport'),
    },
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require('./generated/dependencies-manifest.json')
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        tslint: {
          emitErrors: true,
          failOnHint: true
        }
      }
    }),
    new webpack.DefinePlugin({
      MODE: JSON.stringify(PRODUCTION ? 'production' : 'development')
    })
  ],
}