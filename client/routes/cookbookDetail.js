'use strict';
import Vue from '../lib/vue.min'

let Index = Vue.extend({
    //replace : false, //必须注释掉 不然动画失效
    template : `
    <div>
        <!-- 标题栏 -->
        <header class="bar bar-nav">
            <a class="icon icon-left pull-left open-panel" @click="goBack()"></a>
            <h1 class="title">{{cookbookDetail.name}}</h1>
        </header>

        <!-- 这里是页面内容区 -->
        <div class="content">
          <div class="content-padded">
            <p style="text-align: center;"><img src="http://tnfs.tngou.net/img{{cookbookDetail.img}}"></p>
            {{{cookbookDetail.message}}}
          </div>
        </div>
    </div>
    `,
    ready : function(){
        
    },
    data : ()=>{
        return {
            cookbookDetail : {}
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
            transition.next()
        },
        deactivate: function (transition) {
            transition.next()
        }
    }
})

export default Index