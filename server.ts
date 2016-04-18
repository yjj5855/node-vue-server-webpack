'use strict'
import * as express from "express";
import * as bodyParser from "body-parser";
import errorHandler = require("errorhandler");
import methodOverride = require("method-override");
import * as cookieParser from 'cookie-parser';
import {config} from './env'


import * as index from "./server/routes/index";
import * as cookbook from "./server/routes/cookbook";
import * as cookbookDetail from './server/routes/cookbookDetail';


var app = express();

// Configuration
var env = config.NODE_ENV || 'development';
if (env === 'development') {
    var webpack = require('webpack');
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var WebpackConfig = require('./webpack.dev.config');
    app.use(errorHandler());
    app.use(webpackDevMiddleware(webpack(WebpackConfig), {
        publicPath: '/__build__/',
        stats: {
            colors: true
        }
    }));
    app.set('views',__dirname + '/server/views/dev');
}else{
    app.set('views',config.PATH_BUILD);
}

app.set('view engine', 'html');
app.engine('.html', require('ejs').__express)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());
app.use(express.static(__dirname));


// Routes
app.get('/', index.index);
app.get('/cookbook', index.index);
app.get('/cookbook/:id', cookbook.index);
app.get('/cookbookDetail/:id', cookbookDetail.index);


app.listen(config.PORT, function(){
    console.log("Demo Express server listening on port %d in %s mode", config.PORT, config.NODE_ENV);
});

export var App = app;