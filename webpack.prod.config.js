var webpack = require('webpack')
var config = require('./webpack.base.config')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin");

config.devtool = 'source-map'

config.output.filename = '[name].[chunkhash:8].js'
config.output.chunkFilename = '[id].[chunkhash:8].js'


config.plugins = (config.plugins || []).concat([
  //把所有独立样式的CSS打包成一个style.css
  new ExtractTextPlugin("styles.[hash:8].css",{allChunks: true}),
  new webpack.optimize.CommonsChunkPlugin({
    name: "vendor",

    filename: "[name].[hash:8].js",
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
    template: './server/views/dist/layout.html',
    filename: 'layout.html',
    inject: 'body',
    chunks: ['vendor', 'web_app'],
    minify:{    //压缩HTML文件
      removeComments:true,    //移除HTML中的注释
      collapseWhitespace:false    //删除空白符与换行符
    }
  })
])

module.exports = config