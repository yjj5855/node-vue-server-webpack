'use strict';
import Vue from 'vue'
import Tpl from './template.html'

let Index = Vue.extend({
    //replace : false, //必须注释掉 不然动画失效
    template : Tpl,
    data : ()=>{
        return {
            title : '菜谱首页',
            cookbookClasses : []
        }
    },
    methods: {
        goCookbook(id){
            this.$router.go('/cookbook/'+id);
        }
    },
    route : {
        data : function(transition) {
            //如果是服务端渲染的,应该设置全局变量,那么客户端就不用异步请求数据了
            if(window.cm_cookbookClasses){
                this.$data = window.cm_cookbookClasses;
                transition.next();
            }else{
                let qa_id = 0;

                var resource = this.$resource('http://apis.baidu.com/tngou/cook/classify');
                $.showPreloader();
                resource.get({id: qa_id}).then((response)=>{
                    $.hidePreloader();
                    if(response.status == 200){
                        this.$data = {
                            title : '菜谱首页',
                            cookbookClasses : response.data.tngou
                        }
                        transition.next();
                    }else{
                        transition.abort();
                    }
                });
            }
        },
        canActivate: function(){

        },
        activate: function (transition) {
            this.$data = window.cm_cookbookClasses;
            transition.next()
        },
        deactivate: function (transition) {
            window.cm_cookbookClasses = this.$data;
            transition.next()
        }
    }
})

export default Index