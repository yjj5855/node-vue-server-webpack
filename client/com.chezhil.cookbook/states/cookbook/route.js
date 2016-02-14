'use strict';
import Vue from 'vue'
import Tpl from './template.html'

let Index = Vue.extend({
    //replace : false, //必须注释掉 不然动画失效
    template : Tpl,
    ready : function(){
        
    },
    data : ()=>{
        return {
            cookbookDetail : {
                img : '',
            }
        }
    },
    methods: {
        goBack(){
            window.history.back();
        }
    },
    route : {
        data : function(transition){
            //如果是服务端渲染的,应该设置全局变量,那么客户端就不用异步请求数据了
            if(window.cm_cookbookDetail && window.cm_cookbookDetail.id == transition.to.params.id){
                this.$data = {
                    cookbookDetail:window.cm_cookbookDetail
                };
                transition.next();
            }else{
                let qa_id = transition.to.params.id;
                $.showPreloader();
                let resource = this.$resource('http://apis.baidu.com/tngou/cook/show');
                resource.get({id: qa_id}).then((response)=>{
                    $.hidePreloader();
                    if(response.status == 200){
                        this.$data = {
                            cookbookDetail : response.data
                        };
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
            this.$data.cookbookDetail = window.cm_cookbookDetail;
            transition.next()
        },
        deactivate: function (transition) {
            window.cm_cookbookDetail = this.$data.cookbookDetail
            transition.next()
        }
    }
})

export default Index