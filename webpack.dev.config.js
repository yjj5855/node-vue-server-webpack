var webpack = require('webpack')
var config = require('./webpack.base.config')
var HtmlWebpackPlugin = require('html-webpack-plugin')

config.devtool = 'source-map'

config.output.filename = '[name].js'
config.output.chunkFilename = '[id].[hash:8].js'

config.plugins = (config.plugins || []).concat([
  new webpack.optimize.CommonsChunkPlugin({
    name: "vendor",

    filename: "[name].js",
    // (Give the chunk a different name)

    minChunks: Infinity,
    // (with more entries, this ensures that no other module
    //  goes into the vendor chunk)
  }),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false
    }
  }),
  new HtmlWebpackPlugin({
    name:'layout',
    template: './server/views/layout.html',
    //filename: 'layout.html',
    inject: 'body',
    //chunks: ['vendor', 'app']
  })
])

module.exports = config