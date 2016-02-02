'use strict';
import express = require("express")
import vueServer = require("vue-server")
import fs = require('fs')
import request = require('request'); //第3方http请求的插件
import queryString = require('querystring'); //转换get参数的插件


var Vue = new vueServer.renderer();

export function index(req: express.Request, res: express.Response) {

    let vm:vueServer,
        b:Object,
        options:Object;

    options = {
        method: 'GET',
        url: 'http://apis.baidu.com/tngou/cook/classify?'+queryString.stringify({
            id : 0,
        }),
        headers: {
            //百度API的开放接口凭证
            'apikey': 'a369f43a6392605426433831e10765ec'
        }
    };
    request(options,function(err,resp,body){

        if (!err && resp.statusCode == 200) {
            b = JSON.parse(body);
            vm = new Vue({
                replace : false,
                template : `
                <div>
                    <!-- 标题栏 -->
                    <header class="bar bar-nav">
                        <a class="icon icon-me pull-left open-panel"></a>
                        <h1 class="title">{{title}}</h1>
                    </header>

                    <!-- 这里是页面内容区 -->
                    <div class="content">
                      <div class="list-block">
                        <ul>
                          <li class="item-content" v-for="item in cookbookClasses">
                            <div class="item-media"><i class="icon icon-f7"></i></div>
                            <div class="item-inner">
                              <div class="item-title">{{item.title}}</div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                </div>
                `,
                data : {
                    title : '菜谱首页',
                    cookbookClasses: b.tngou,
                }
            });
        }
        vm.$on('vueServer.htmlReady', function(html:string) {
            res.render('layout',{
                server_html:html,
                server_data:`
                    window.cm_cookbookClasses = {
                        title : '菜谱首页',
                        cookbookClasses: ${JSON.stringify(b.tngou)}
                    }`
            })
        });

    });

};