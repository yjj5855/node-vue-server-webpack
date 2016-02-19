'use strict';
import Vue from 'vue'
import Tpl from './template.html'
import userService from '../../service/user.service'

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
                if(path.test('member')){
                    this.$router.go('/cookbook/1')
                }else{
                    this.$router.go(path)
                }
            }catch (e){
                this.$router.go('/cookbook/1')
            }
        },
        login(){

        },
        loginByWeiXin(){
            //todo 跳转到微信授权页面 返回地址是登陆页
            //window.location.href = '';
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