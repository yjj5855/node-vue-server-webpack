var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {

  devtool: 'source-map',

  entry: {
    app: "./client/com.chezhil.cookbook/main.js",
    //公共库
    vendor : [
      'vue',
      'vue-router',
      'q',
      './env'
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
      { test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel' ,
        query: {
          cacheDirectory: true,
          presets: ['es2015','stage-3'],
          // plugins: ['transform-runtime']
        }
      },
      { test: /\.html$/, loader: 'raw' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader','css-loader') }
    ]
  }

}
