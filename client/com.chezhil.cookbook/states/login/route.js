'use strict';
import Vue from 'vue'
import Tpl from './template.html'

let Index = Vue.extend({
    //replace : true, //必须注释掉 不然动画失效
    template : Tpl,
    ready : function(){
        $.init();
    },
    data : ()=>{
        return {
            user_account : '',
            password : ''
        }
    },
    methods: {
        goBack(){
            let path;
            try{
                path = this.$route.router._prevTransition.to.path;
                this.$router.go(path)
            }catch (e){
                this.$router.go('/cookbook/1')
            }
        }
    },
    computed : {
        isWeiXin : function(){
            return $.device.isWeixin;
        }
    },
    route : {
        data : function(transition){
            //如果是服务端渲染的,应该设置全局变量,那么客户端就不用异步请求数据了
            transition.next()
        }
    }
})

export default Index