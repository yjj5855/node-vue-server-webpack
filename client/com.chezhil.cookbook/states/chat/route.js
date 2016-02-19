'use strict';
import Vue from 'vue'
import Tpl from './template.html'
import './style.css'
import Q from 'q'

let Index = Vue.extend({
    //replace : true, //必须注释掉 不然动画失效
    template : Tpl,
    ready : function(){ //做浏览器判断 和 兼容

        //绑定下拉刷新事件
        $('.pull-to-refresh-content').on('refresh',()=>{

        });

        //需要初始化一下,不然监听不到infinite事件
        $.init();

    },
    data : ()=>{
        return {

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
        goRoute(route){
            //$.closePanel();
            $('body').removeClass('with-panel-left-reveal');
            //setTimeout(()=>{
                this.$router.go(route);
            //},5e2)
        },
    },
    computed : {

    },
    route : {
        data : function(transition){
            transition.next();
        },
        canReuse: true, //可以被重用,跳转到其他cookbook/? 页面时触发. 设置为True跳转失败会无限跳转
        deactivate: function(transition){
            transition.next();
        }
    }
})

export default Index