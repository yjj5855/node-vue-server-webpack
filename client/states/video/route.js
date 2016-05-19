'use strict';
import Vue from 'vue'
import Tpl from './template.html'
import Value from './value'
import './style.less'
import {searchLiveRoom} from '../../service/pandaService'

let Index = Vue.extend({
    //replace : true, //必须注释掉 不然动画失效
    template : Tpl,
    init : function () {
        
    },
    ready : function(){ //做浏览器判断 和 兼容
        
       
        $.init();
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
            this.url = decodeURIComponent(transition.to.query.url);
            console.log(this.url)
        }
    }
})

export default Index