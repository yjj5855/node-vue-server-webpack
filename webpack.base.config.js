var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {

  devtool: 'source-map',

  entry: {
    web_app:"./client/main",
    //公共库
    vendor : [
      'babel-polyfill',
      './env',
      'vue',
      'vue-router',
    ]
  },

  output: {
    path: __dirname + '/public/liveSearch',
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[id].[chunkhash:8].js',
    publicPath: '/liveSearch/'
  },

  module: {
    loaders: [
      { test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel' ,
        query: {
          cacheDirectory: true,
          presets: ['es2015','stage-3']
        }
      },
      { test: /\.html$/, loader: 'raw' },
      { test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader") }
    ]
  }
}
