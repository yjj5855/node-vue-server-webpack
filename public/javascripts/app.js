import Vue from './vue.min'
import VueRouter from './vue-router.min'

//懒加载路由 只有访问这个路由才会加载js
import Foo from 'bundle?lazy!../../components/foo'
import Bar from 'bundle?lazy!../../components/bar'
import Index from 'bundle?lazy!../../components/index'

var App = Vue.extend({})

Vue.use(VueRouter)

var router = new VueRouter({
    history: true, //html5模式 去掉锚点
    saveScrollPosition: true //记住页面的滚动位置 html5模式适用
})

//定义路由
router.map({
    '/'   : {
        component: Index
    },
    '/foo': {
        component: Foo
    },
    '/bar': {
        component: Bar
    }
})

//启动APP
router.start(App, '#app')