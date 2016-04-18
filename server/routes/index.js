'use strict';
var vueServer = require("vue-server");
var Vue = new vueServer.renderer();
function index(req, res) {
    res.writeHead(301, {
        'Location': '/cookbook/1'
    });
    res.end();
    //let vm:vueServer,
    //    b:Object,
    //    options:Object;
    //
    //options = {
    //    method: 'GET',
    //    url: 'http://apis.baidu.com/tngou/cook/classify?'+queryString.stringify({
    //        id : 0,
    //    }),
    //    headers: {
    //        //百度API的开放接口凭证
    //        'apikey': 'a369f43a6392605426433831e10765ec'
    //    }
    //};
    //request(options,function(err,resp,body){
    //
    //    if (!err && resp.statusCode == 200) {
    //        b = JSON.parse(body);
    //        vm = new Vue({
    //            replace : false,
    //            template : fs.readFileSync(config.PATH_COOKBOOK+'/states/cookbook-class/template.html','utf-8'),
    //            data : {
    //                title : '菜谱首页',
    //                cookbookClasses: b.tngou,
    //            }
    //        });
    //    }
    //    vm.$on('vueServer.htmlReady', function(html:string) {
    //        res.render('layout',{
    //            server_html:html,
    //            server_data:`
    //                window.cm_cookbookClasses = {
    //                    title : '菜谱首页',
    //                    cookbookClasses: ${JSON.stringify(b.tngou)}
    //                }`
    //        })
    //    });
    //
    //});
}
exports.index = index;
;
//# sourceMappingURL=index.js.map