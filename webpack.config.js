/*eslint-disable no-var */
var fs = require('fs')
var path = require('path')
var webpack = require('webpack')

module.exports = {

  devtool: 'source-map',

  entry: {
    app: "./client/app"
  },

  output: {
    path: __dirname + '/__build__',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/__build__/'
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.html$/, loader: 'raw' },
      { test: /\.css$/, loader: 'style!css' }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ]
}
