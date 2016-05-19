'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.queryTagClassList = queryTagClassList;
exports.queryContentList = queryContentList;
exports.getQaDetail = getQaDetail;
exports.getArticleDetail = getArticleDetail;
exports.queryUserHistoryMsg = queryUserHistoryMsg;

var _env = require('../../env');

var _env2 = _interopRequireDefault(_env);

var _api = require('../../client/service/api.service');

var _api2 = _interopRequireDefault(_api);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//格式化访问API的url
function formatApiUrl(url, req) {
    return url + '?' + _querystring2.default.stringify({
        access_token: req.cookies.access_token,
        version: _env2.default.version,
        channel: _env2.default.channel,
        device: _env2.default.device
    });
}

//查标签列表
function queryTagClassList(req) {
    var options = {
        method: 'GET',
        url: formatApiUrl(_api2.default.queryTagClassList, req),
        json: true
    };
    return (0, _requestPromise2.default)(options);
};

//异步函数
// export async function asyncQueryContentList(req):Promise<any>{
//     let options = {
//         method: 'GET',
//         url: formatApiUrl(api.queryContentList,req)+'&'+queryString.stringify({
//             tag_id : req.params.id,
//             page : 1,
//             update_time : new Date().getTime(),
//             car_type_id : req.webapp_userInfo&&req.webapp_userInfo.car?req.webapp_userInfo.car.type_id:''
//         }),
//         json : true
//     };
//     return request(options).promise();
// }
//查内容接口
function queryContentList(req) {
    var options = {
        method: 'GET',
        url: formatApiUrl(_api2.default.queryContentList, req) + '&' + _querystring2.default.stringify({
            tag_id: req.params.id,
            page: 1,
            update_time: new Date().getTime(),
            car_type_id: req.webapp_userInfo && req.webapp_userInfo.car ? req.webapp_userInfo.car.type_id : ''
        }),
        json: true
    };
    return (0, _requestPromise2.default)(options);
}

function getQaDetail(req) {
    var options = {
        method: 'GET',
        url: formatApiUrl(_api2.default.getQaDetail, req) + '&' + _querystring2.default.stringify({
            id: req.params.id
        }),
        json: true
    };
    return (0, _requestPromise2.default)(options);
}

function getArticleDetail(req) {
    var options = {
        method: 'GET',
        url: formatApiUrl(_api2.default.getArticleDetail, req) + '&' + _querystring2.default.stringify({
            id: req.params.id
        }),
        json: true
    };
    return (0, _requestPromise2.default)(options);
}

function queryUserHistoryMsg(req, page) {
    var options = {
        method: 'GET',
        url: formatApiUrl(_api2.default.queryHistoryMsgList, req) + '&' + _querystring2.default.stringify({
            page: page ? page : 1
        }),
        json: true
    };
    return (0, _requestPromise2.default)(options);
}

//# sourceMappingURL=apiService.js.map