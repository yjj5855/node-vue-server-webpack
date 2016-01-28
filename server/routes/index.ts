import express = require("express")
import vueServer = require("vue-server")
var Vue = new vueServer.renderer();

var cmArticle = require('../../components/article')


export function index(req: express.Request, res: express.Response) {

    //var cmA  = cmArticle(Vue);

    Vue.component('cm-article',{
        props : {
            article_html : {
                type:String,
            },
        },
        template : `
        <div>{{ article_html }}</div>
        `,
    });

    var vm = new Vue({
        replace : false,
        template : `
        <p>This is article</p>
        <cm-article :article_html="html"></cm-article>
        `,
        data : {
            html: '',
        }
    });

    vm.$on('vueServer.htmlReady', function(html:string) {
        res.render('layout',{server_html:html,server_data:'window.cm_data = {name:"张三"}'})
    });

};