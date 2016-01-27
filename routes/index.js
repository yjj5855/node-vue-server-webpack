var vueServer = require("vue-server");
var Vue = new vueServer.renderer();
function index(req, res) {
    var vm = new Vue({
        template: "\n        <p>This is index!</p>\n        "
    });
    vm.$on('vueServer.htmlReady', function (html) {
        res.render('layout', { server_html: html, server_data: 'window.cm_data = {name:"张三"}' });
    });
}
exports.index = index;
;
//# sourceMappingURL=index.js.map