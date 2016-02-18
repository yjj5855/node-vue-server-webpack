import * as http from "http";
import * as url from "url";
import * as express from "express";
import * as bodyParser from "body-parser";
import errorHandler = require("errorhandler");
import methodOverride = require("method-override");
import * as cookieParser from 'cookie-parser';
import {config} from './env'

import * as index from "./server/routes/index";
import * as cookbook from "./server/routes/cookbook";
import * as cookbookDetail from './server/routes/cookbookDetail';
import * as login from './server/routes/login';
import * as member from './server/routes/member';
import * as search from './server/routes/search';

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



app.use(function(req, res, next){
    console.log('经过cookies中间件',req.cookies);
    next();
});

// Routes
app.get('/', index.index);
app.get('/cookbook', index.index);
app.get('/cookbook/:id', cookbook.index);
app.get('/cookbookDetail/:id', cookbookDetail.index);
app.get('/member', member.index)
app.get('/search', search.index)

app.get('/login', login.index);


app.listen(3000, function(){
    console.log("Demo Express server listening on port %d in %s mode", 3000, app.settings.env);
});

export var App = app;