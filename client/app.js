'use strict';
import Vue from './lib/vue.min'
import VueRouter from './lib/vue-router.min'
import VueResource from './lib/vue-resource.min'

//懒加载路由 只有访问这个路由才会加载js
import Index from 'bundle?lazy!./routes/index'
import Cookbook from 'bundle?lazy!./routes/Cookbook'
import CookbookDetail from 'bundle?lazy!./routes/cookbookDetail'


Vue.use(VueResource)
Vue.use(VueRouter)

Vue.http.headers.common['apikey'] = 'a369f43a6392605426433831e10765ec';

var router = new VueRouter({
    history: true, //html5模式 去掉锚点
    saveScrollPosition: true //记住页面的滚动位置 html5模式适用
})

//定义路由
router.map({
    '/cookbook'   : {
        component: Index
    },
    '/cookbook/:id': {
        component: Cookbook
    },
    '/cookbookDetail/:id': {
        component: CookbookDetail
    },
})
router.redirect({
    '*': '/cookbook'
})

var App = Vue.extend({})

//启动APP
router.start(App, '#app')