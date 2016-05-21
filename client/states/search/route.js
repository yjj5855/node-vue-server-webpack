'use strict';
import Vue from 'vue'
import Tpl from './template.html'
import Value from './value'
import './style.less'

let Index = Vue.extend({
    //replace : true, //必须注释掉 不然动画失效
    template : Tpl,
    init : function () {
        
    },
    ready : function(){ //做浏览器判断 和 兼容
        
        //需要初始化一下,不然监听不到infinite事件
        $.init();
    },
    events : {
        
    },
    data : ()=>{
        return Value
    },
    methods: {
       
    },
    computed : {
       
    },
    route : {
        data : function(transition){
           
        }
    }
})

export default Index