var express = require("express");
var bodyParser = require("body-parser");
var errorHandler = require("errorhandler");
var methodOverride = require("method-override");
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var WebpackConfig = require('./webpack.config');
var index = require("./routes/index");
var foo = require("./routes/foo");
var bar = require("./routes/bar");
var app = express();
app.use(webpackDevMiddleware(webpack(WebpackConfig), {
    publicPath: '/__build__/',
    stats: {
        colors: true
    }
}));
// Configuration
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('view options', { layout: false });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(__dirname + '/public'));
var env = process.env.NODE_ENV || 'development';
if (env === 'development') {
    app.use(errorHandler());
}
// Routes
app.get('/', index.index);
app.get('/foo', foo.index);
app.get('/bar', bar.index);
app.listen(3000, function () {
    console.log("Demo Express server listening on port %d in %s mode", 3000, app.settings.env);
});
exports.App = app;
//# sourceMappingURL=app.js.map