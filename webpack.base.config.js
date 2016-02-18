var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {

  devtool: 'source-map',

  entry: {
    app: "./client/com.chezhil.cookbook/main",
    //公共库
    vendor : [
      'vue',
      'vue-router',
      'q'
    ]
  },

  output: {
    path: __dirname + '/__build__',
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[id].[chunkhash:8].js',
    publicPath: '/__build__/'
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.html$/, loader: 'raw' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader','css-loader') }
    ]
  }

}
