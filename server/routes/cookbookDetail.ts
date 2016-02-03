'use strict';
import express = require("express")
import vueServer = require("vue-server")
import fs = require('fs')
import request = require('request'); //第3方http请求的插件
import queryString = require('querystring'); //转换get参数的插件


var Vue = new vueServer.renderer();

export function index(req: express.Request, res: express.Response) {

    let cookbook_id:number = req.params.id;

    let vm:vueServer,
        b:Object,
        options:Object;

    options = {
        method: 'GET',
        url: 'http://apis.baidu.com/tngou/cook/show?'+queryString.stringify({
            id : cookbook_id,
        }),
        headers: {
            //百度API的开放接口凭证
            'apikey': 'a369f43a6392605426433831e10765ec'
        }
    };
    request(options,function(err,resp,body){
        //这个接口 没有返回这个ID的title
        if (!err && resp.statusCode == 200) {
            b = JSON.parse(body);
            vm = new Vue({
                replace : false,
                template : `
                <div>
                    <!-- 标题栏 -->
                    <header class="bar bar-nav">
                        <a class="icon icon-left pull-left open-panel"></a>
                        <h1 class="title">{{cookbookDetail.name}}</h1>
                    </header>

                    <!-- 这里是页面内容区 -->
                    <div class="content">
                      <div class="content-padded">
                        {{{cookbookDetail.message}}}
                      </div>
                    </div>
                </div>
                `,
                data : {
                    cookbookDetail : b
                }
            });
        }
        vm.$on('vueServer.htmlReady', function(html:string) {
            res.render('layout',{
                server_html:html,
                server_data:`
                    window.cm_cookbookDetail = ${JSON.stringify(b)}`
            })
        });

    });



};