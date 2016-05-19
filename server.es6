'use strict'
import express from "express";
import bodyParser from "body-parser";
import errorHandler from "errorhandler";
import methodOverride from "method-override";
import cookieParser from "cookie-parser";
import config from './env'

import index from "./server/routes/index";

var app = express()
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

// Routes
app.get('/', index);

app.listen(config.PORT, function(){
    console.log("Demo Express server listening on port %d in %s mode", config.PORT, config.NODE_ENV || '');
});
