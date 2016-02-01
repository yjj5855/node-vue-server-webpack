import express = require("express")
import vueServer = require("vue-server")

import fs = require('fs')

var Vue = new vueServer.renderer();

export function index(req: express.Request, res: express.Response) {

    //var tpl = fs.readFileSync(__dirname+'/../template/index.html','utf-8');

    var vm = new Vue({
        template: `
        <p>This is bar!</p>
        `
    });

    vm.$on('vueServer.htmlReady', function(html:string) {
        res.render('layout',{server_html:html,server_data:'window.cm_data = {name:"张三"}'})
    });

};