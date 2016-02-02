'use strict';
import express = require("express")
import vueServer = require("vue-server")
import fs = require('fs')
import request = require('request'); //第3方http请求的插件
import queryString = require('querystring'); //转换get参数的插件


var Vue = new vueServer.renderer();

export function index(req: express.Request, res: express.Response) {

    let qa_id:number = req.params.id;

    let vm:vueServer,
        b:Object,
        options:Object;

    options = {
        method: 'GET',
        url: 'http://apis.baidu.com/tngou/cook/list?'+queryString.stringify({
            id : qa_id,
            page : 1,
            rows : 20
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
                        <a class="icon icon-left pull-left open-panel"></a>
                        <h1 class="title">服务端标题</h1>
                    </header>

                    <!-- 这里是页面内容区 -->
                    <div class="content">
                      <div class="card" v-for="item in cookbookItems">
                        <div class="card-content">
                          <div class="list-block media-list">
                            <ul>
                              <li class="item-content">
                                <div class="item-media">
                                  <img src="http://tnfs.tngou.net/img{{item.img}}" width="44">
                                </div>
                                <div class="item-inner">
                                  <div class="item-title-row">
                                    <div class="item-title">{{item.name}}</div>
                                  </div>
                                  <div class="item-subtitle">{{item.food}}</div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
                `,
                data : {
                    cookbookItems: b.tngou,
                    id  : qa_id
                }
            });
        }
        vm.$on('vueServer.htmlReady', function(html:string) {
            res.render('layout',{
                server_html:html,
                server_data:`
                    window.cm_cookbookItems = {
                        title : '服务端标题',
                        cookbookItems: ${JSON.stringify(b.tngou)},
                        id  : ${qa_id}
                    }`
            })
        });

    });



};