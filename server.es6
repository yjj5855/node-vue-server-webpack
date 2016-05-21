'use strict'
import "babel-polyfill"
import express from "express";
import bodyParser from "body-parser";
import errorHandler from "errorhandler";
import methodOverride from "method-override";
import cookieParser from "cookie-parser";
import config from './env'

import * as clientApi from './server/routes/clientApi'
import index from "./server/routes/index"
import search from './server/routes/search'

var app = express();
app.use(errorHandler());

// Configuration
var env = config.NODE_ENV || 'development';
if (env === 'development') {
    var webpack = require('webpack');
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var WebpackConfig = require('./webpack.dev.config');
    app.use(webpackDevMiddleware(webpack(WebpackConfig), {
        publicPath: '/liveSearch/',
        stats: {
            colors: true
        }
    }));
    app.set('views',__dirname + '/server/views/dev');
}else{
    app.set('views',__dirname + '/public/liveSearch');
}
app.set('view engine', 'html');
app.engine('.html', require('ejs').__express)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());
app.use(express.static(__dirname+'/public'));

//前端路由
app.get('/', index);
app.get('/search/:keyword',index)
app.get('/search/:keyword/panda',index)
app.get('/search/:keyword/huya',index)
app.get('/search/:keyword/douyu',index)
app.get('/search/:keyword/bili',index)
app.get('/video',index)

//api
app.get('/panda/:keyword',clientApi.panda)
app.get('/huya/:keyword',clientApi.huya)
app.get('/douyu/:keyword',clientApi.douyu)
app.get('/bili/:keyword',clientApi.bili)

app.listen(config.PORT, function(){
    console.log("Demo Express server listening on port %d in %s mode", config.PORT, config.NODE_ENV || '');
});
