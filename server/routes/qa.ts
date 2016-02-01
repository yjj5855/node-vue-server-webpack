'use strict';
import express = require("express")
import vueServer = require("vue-server")
import fs = require('fs')

import cmQa = require('../../components/qa/qa');
import cmComment = require('../../components/comment/comment');

var Vue = new vueServer.renderer();

export function index(req: express.Request, res: express.Response) {

    let qa_id = req.params.id;

    let vm = new Vue({
        replace : false,
        template : `
        <p>This is qa</p>
        <cm-qa :qa_content="content" :qa_title="title"></cm-qa>
        <cm-comment :type="type" :id="id"></cm-comment>
        `,
        data : {
            title : "服务端问答标题",
            content:[
                {
                    id : 1,
                }
            ],
            type: 'qa',
            id  : qa_id
        },
        components: {
            'cmQa': cmQa(Vue,fs),
            'cmComment': cmComment(Vue,fs)
        }
    });

    vm.$on('vueServer.htmlReady', function(html:string) {
        res.render('layout',{
            server_html:html,
            server_data:`
            window.cm_qa = {
                title : '服务端问答标题',
                content:[
                    { id : 2 }
                ],
                type: 'qa',
                id  : ${qa_id}
            }`
        })
    });

};