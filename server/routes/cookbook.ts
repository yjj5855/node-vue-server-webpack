'use strict';
import express = require("express");
import fs = require('fs');
import {getCookbookClass,getCookbookList} from '../lib/apiService'
import Vue from '../lib/vueServerFactory'
import timeDiff from '../../client/filter/date.filter'
import {config} from '../../env'

export async function index(req: express.Request, res: express.Response) {

    let cookbook_id:number = req.params.id;

    let vm;
        
    try {
        
        let classes = await getCookbookClass();
        let list = await getCookbookList(cookbook_id);
        
        
        timeDiff(Vue);
        vm = new Vue({
            replace : false,
            template : fs.readFileSync(config.PATH_COOKBOOK+'/states/cookbook-list/template.html','utf-8'),
            data : {
                cookbookClasses : classes.tngou,
                title : '菜谱列表',
                cookbookItems: list.tngou,
                id  : cookbook_id,
                page : 1,
                maxItems : list.total,
                updateTime : '',
                valOptions : [],
            }
        });
        vm.$on('vueServer.htmlReady', function(html:string) {
            res.render('layout',{
                server_html:html,
                server_data:`
                    window.cm_cookbookItems = {
                        cookbookClasses : ${JSON.stringify(classes.tngou)},
                        title : '菜谱列表',
                        cookbookItems: ${JSON.stringify(list.tngou)},
                        id  : ${cookbook_id},
                        page : 2,
                        maxItems : ${list.total},
                        updateTime : new Date().getTime(),
                        valOptions : []
                    }`
            })
        });
        
    }catch(err){
        res.writeHead(500);
        res.end();
    }
};