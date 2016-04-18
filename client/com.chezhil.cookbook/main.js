'use strict';
import './main.css'
import Vue from 'vue'
import VueRouter from 'vue-router'
import plugin from '../lib/cm-plugin'
import timeDiff from '../filter/date.filter'

//Vue.config.debug = true;
//Vue.config.silent = true;//取消 Vue.js 所有的日志与警告。
Vue.use(VueRouter);
Vue.use(plugin);

timeDiff(Vue); //定义过滤器

var router = new VueRouter({
    history: true, //html5模式 去掉锚点
    saveScrollPosition: true //记住页面的滚动位置 html5模式适用
})

//定义路由
router.map({
    '/cookbook/:id': {
        component: function(resolve){
            //webpack自带功能 实现异步加载路由
            require.ensure([], function() {
                let route = require('./states/cookbook-list/route').default;
                resolve(route);
            })
        }
    },
    '/cookbookDetail/:id': {
        component: function(resolve){
            //webpack自带功能 实现异步加载路由
            require.ensure([], function() {
                let route = require('./states/cookbook/route').default;
                resolve(route);
            })
        }
    }
})
router.redirect({
    '*': '/cookbook/1'
})

var App = Vue.extend({})

//启动APP
router.start(App, '#app');

console.log('本地存储用了',JSON.stringify(localStorage).length/1024,'K');