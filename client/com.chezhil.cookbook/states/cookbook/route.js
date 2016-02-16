'use strict';
import Vue from 'vue'
import Tpl from './template.html'
import cookbookService from '../../service/cookbook.service'

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
                cookbookService.getCookbookDetail(qa_id).then((response)=>{
                    $.hidePreloader();
                    if(response.status){
                        this.$data = {
                            cookbookDetail : response
                        };
                        transition.next();
                    }else{
                        transition.abort();
                    }
                })
            }
        }
    }
})

export default Index