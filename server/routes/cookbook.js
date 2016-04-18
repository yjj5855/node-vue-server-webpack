'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var fs = require('fs');
var apiService_1 = require('../lib/apiService');
var vueServerFactory_1 = require('../lib/vueServerFactory');
var date_filter_1 = require('../../client/filter/date.filter');
var env_1 = require('../../env');
function index(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var cookbook_id = req.params.id;
        var vm;
        try {
            var classes_1 = yield apiService_1.getCookbookClass();
            var list_1 = yield apiService_1.getCookbookList(cookbook_id);
            date_filter_1["default"](vueServerFactory_1["default"]);
            vm = new vueServerFactory_1["default"]({
                replace: false,
                template: fs.readFileSync(env_1.config.PATH_COOKBOOK + '/states/cookbook-list/template.html', 'utf-8'),
                data: {
                    cookbookClasses: classes_1.tngou,
                    title: '菜谱列表',
                    cookbookItems: list_1.tngou,
                    id: cookbook_id,
                    page: 1,
                    maxItems: list_1.total,
                    updateTime: '',
                    valOptions: []
                }
            });
            vm.$on('vueServer.htmlReady', function (html) {
                res.render('layout', {
                    server_html: html,
                    server_data: "\n                    window.cm_cookbookItems = {\n                        cookbookClasses : " + JSON.stringify(classes_1.tngou) + ",\n                        title : '\u83DC\u8C31\u5217\u8868',\n                        cookbookItems: " + JSON.stringify(list_1.tngou) + ",\n                        id  : " + cookbook_id + ",\n                        page : 2,\n                        maxItems : " + list_1.total + ",\n                        updateTime : new Date().getTime(),\n                        valOptions : []\n                    }"
                });
            });
        }
        catch (err) {
            res.writeHead(500);
            res.end();
        }
    });
}
exports.index = index;
;
//# sourceMappingURL=cookbook.js.map