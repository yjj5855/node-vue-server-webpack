'use strict';

require("babel-polyfill");

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _compression = require("compression");

var _compression2 = _interopRequireDefault(_compression);

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

var _clientApi = require("./server/routes/clientApi");

var clientApi = _interopRequireWildcard(_clientApi);

var _index = require("./server/routes/index");

var _index2 = _interopRequireDefault(_index);

var _search = require("./server/routes/search");

var _search2 = _interopRequireDefault(_search);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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

app.use((0, _compression2.default)());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());
app.use((0, _methodOverride2.default)());
app.use((0, _cookieParser2.default)());
app.use(_express2.default.static(__dirname + '/public'));

//前端路由
app.get('/', _index2.default);
app.get('/search/:keyword', _index2.default);
app.get('/search/:keyword/panda', _index2.default);
app.get('/search/:keyword/huya', _index2.default);
app.get('/search/:keyword/douyu', _index2.default);
app.get('/search/:keyword/bili', _index2.default);
app.get('/search/:keyword/zhanqi', _index2.default);
app.get('/video', _index2.default);
app.use('/webhooks', function (req, res) {
    console.log(req.body);
    res.json(req.body);
});

//api
app.get('/panda/:keyword', clientApi.panda);
app.get('/huya/:keyword', clientApi.huya);
app.get('/douyu/:keyword', clientApi.douyu);
app.get('/bili/:keyword', clientApi.bili);
app.get('/zhanqi/:keyword', clientApi.zhanqi);

app.listen(_env2.default.PORT, function () {
    console.log("Demo Express server listening on port %d in %s mode", _env2.default.PORT, _env2.default.NODE_ENV || '');
});

//# sourceMappingURL=server.js.map