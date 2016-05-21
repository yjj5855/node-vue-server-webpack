'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _env = require('../../env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api_url = {

    searchPandaLiveRoom: _env2.default.host_panda + '/ajax_search',

    searchHuyaLiveRoom: _env2.default.host_huya,

    searchDouyuLiveRoom: _env2.default.host_douyu
};

exports.default = api_url;

//# sourceMappingURL=apiService.js.map