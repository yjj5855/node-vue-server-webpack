'use strict';

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _errorhandler = require("errorhandler");

var _errorhandler2 = _interopRequireDefault(_errorhandler);

var _methodOverride = require("method-override");

var _methodOverride2 = _interopRequireDefault(_methodOverride);

var _cookieParser = require("cookie-parser");

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _env = require("./env");

var _env2 = _interopRequireDefault(_env);

var _index = require("./server/routes/index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use((0, _errorhandler2.default)());

// Configuration
var env = _env2.default.NODE_ENV || 'development';
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
    app.set('views', __dirname + '/server/views/dev');
} else {
    app.set('views', __dirname + '/public/liveSearch');
}
app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());
app.use((0, _methodOverride2.default)());
app.use((0, _cookieParser2.default)());
app.use(_express2.default.static(__dirname + '/public'));

// Routes
app.get('/', _index2.default);

app.listen(_env2.default.PORT, function () {
    console.log("Demo Express server listening on port %d in %s mode", _env2.default.PORT, _env2.default.NODE_ENV || '');
});

//# sourceMappingURL=server.js.map