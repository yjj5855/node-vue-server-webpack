'use strict';
import express = require("express")
import vueServer = require("vue-server")
import fs = require('fs')
import request = require('request'); //第3方http请求的插件
import queryString = require('querystring'); //转换get参数的插件
import {config} from '../../env'

var Vue = new vueServer.renderer();

export function index(req: express.Request, res: express.Response) {


    let vm:vueServer;

    vm = new Vue({
        replace : false,
        template : fs.readFileSync(config.PATH_COOKBOOK+'/states/login/template.html','utf-8'),
        data : {
            user_account : '',
            password : ''
        }
    });

    vm.$on('vueServer.htmlReady', function(html:string) {
        res.render('layout',{
            server_html:html,
            server_data:''
        })
    })
}