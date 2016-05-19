'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (req, res) {

    res.render('layout', (0, _setWindowDate2.default)('', [{
        name: 'tagClass',
        data: ''
    }, {
        name: 'contentList',
        data: ''
    }]));
};

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _env = require('../../env');

var _env2 = _interopRequireDefault(_env);

var _setWindowDate = require('../lib/setWindowDate');

var _setWindowDate2 = _interopRequireDefault(_setWindowDate);

var _vueServerFactory = require('../lib/vueServerFactory');

var _vueServerFactory2 = _interopRequireDefault(_vueServerFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//# sourceMappingURL=index.js.map