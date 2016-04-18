'use strict';
var express = require("express");
var bodyParser = require("body-parser");
var errorHandler = require("errorhandler");
var methodOverride = require("method-override");
var cookieParser = require('cookie-parser');
var env_1 = require('./env');
var index = require("./server/routes/index");
var cookbook = require("./server/routes/cookbook");
var cookbookDetail = require('./server/routes/cookbookDetail');
var app = express();
// Configuration
var env = env_1.config.NODE_ENV || 'development';
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
    app.set('views', __dirname + '/server/views/dev');
}
else {
    app.set('views', env_1.config.PATH_BUILD);
}
app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);
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
app.listen(env_1.config.PORT, function () {
    console.log("Demo Express server listening on port %d in %s mode", env_1.config.PORT, env_1.config.NODE_ENV);
});
exports.App = app;
//# sourceMappingURL=server.js.map