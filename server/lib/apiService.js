'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _env = require('../../env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api_url = {
    pandaHost: _env2.default.host_panda + '/search?kw=守望先锋',
    searchPandaLiveRoom: _env2.default.host_panda + '/ajax_search'
};

exports.default = api_url;

//# sourceMappingURL=apiService.js.map