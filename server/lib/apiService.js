'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var request = require('request-promise');
var queryString = require('querystring');
//获取菜谱分类
function getCookbookClass() {
    return __awaiter(this, void 0, void 0, function* () {
        var options = {
            method: 'GET',
            url: 'http://apis.baidu.com/tngou/cook/classify?' + queryString.stringify({
                id: 0
            }),
            headers: {
                //百度API的开放接口凭证
                'apikey': 'a369f43a6392605426433831e10765ec'
            },
            json: true
        };
        return request(options).promise();
    });
}
exports.getCookbookClass = getCookbookClass;
//获取菜谱分类中的列表
function getCookbookList(cookbook_id) {
    return __awaiter(this, void 0, void 0, function* () {
        var options = {
            method: 'GET',
            url: 'http://apis.baidu.com/tngou/cook/list?' + queryString.stringify({
                id: cookbook_id,
                page: 1,
                rows: 20
            }),
            headers: {
                //百度API的开放接口凭证
                'apikey': 'a369f43a6392605426433831e10765ec'
            },
            json: true
        };
        return request(options).promise();
    });
}
exports.getCookbookList = getCookbookList;
//# sourceMappingURL=apiService.js.map