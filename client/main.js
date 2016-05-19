'use strict';
import Vue from 'vue'
import VueRouter from 'vue-router'

//懒加载路由 只有访问这个路由才会加载js


Vue.use(VueRouter)

var router = new VueRouter({
    history: true, //html5模式 去掉锚点
    saveScrollPosition: true //记住页面的滚动位置 html5模式适用
})

//定义路由
router.map({
    '/': {
        component: {
            
        }
    },
})
router.redirect({
    '*': '/'
})

var App = Vue.extend({})

//启动APP
router.start(App, '#app')