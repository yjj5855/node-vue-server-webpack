import * as http from "http";
import * as url from "url";
import * as express from "express";
import * as bodyParser from "body-parser";
import errorHandler = require("errorhandler");
import methodOverride = require("method-override");
import {config} from './env'

var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var WebpackConfig = require('./webpack.config');

import * as index from "./server/routes/index";
import * as cookbook from "./server/routes/cookbook";
import * as cookbookDetail from './server/routes/cookbookDetail';
import * as login from './server/routes/login';

var app = express();

// Configuration

app.set('views', __dirname + '/server/views');
app.set('view engine', 'ejs');
app.set('view options', { layout: false });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(__dirname));

var env = config.NODE_ENV || 'development';
if (env === 'development') {
    app.use(errorHandler());
    app.use(webpackDevMiddleware(webpack(WebpackConfig), {
        publicPath: '/__build__/',
        stats: {
            colors: true
        }
    }));
}

// Routes
app.get('/', index.index);
app.get('/cookbook', index.index);
app.get('/cookbook/:id', cookbook.index);
app.get('/cookbookDetail/:id', cookbookDetail.index);

app.get('/login', login.index);


app.listen(3000, function(){
    console.log("Demo Express server listening on port %d in %s mode", 3000, app.settings.env);
});

export var App = app;