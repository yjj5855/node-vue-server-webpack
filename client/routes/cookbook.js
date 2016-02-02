'use strict';
import Vue from '../lib/vue.min'

let Index = Vue.extend({
    //replace : false, //必须注释掉 不然动画失效
    template : `
    <div>
        <!-- 标题栏 -->
        <header class="bar bar-nav">
            <a class="icon icon-left pull-left open-panel" @click="goBack()"></a>
            <h1 class="title">{{title}}</h1>
        </header>

        <!-- 这里是页面内容区 -->
        <div class="content">
          <div class="card" v-for="item in cookbookItems">
            <div class="card-content">
              <div class="list-block media-list">
                <ul>
                  <li class="item-content">
                    <div class="item-media">
                      <img src="http://tnfs.tngou.net/img{{item.img}}" width="44">
                    </div>
                    <div class="item-inner">
                      <div class="item-title-row">
                        <div class="item-title">{{item.name}}</div>
                      </div>
                      <div class="item-subtitle">{{item.food}}</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
    </div>
    `,
    data : ()=>{
        return {
            title : '菜谱列表',
            cookbookItems : [],
        }
    },
    methods: {
        goBack(){
            window.history.back();
        }
    },
    route : {
        data : function(transition) {
            //如果是服务端渲染的,应该设置全局变量,那么客户端就不用异步请求数据了
            if(window.cm_cookbookItems && window.cm_cookbookItems.id == transition.to.params.id){
                this.$data = window.cm_cookbookItems;
                transition.next();
            }else{
                let qa_id = transition.to.params.id;

                var resource = this.$resource('http://apis.baidu.com/tngou/cook/list');
                resource.get({id: qa_id}).then((response)=>{
                    if(response.status == 200){
                        this.$data = {
                            title : '菜谱列表',
                            cookbookItems : response.data.tngou
                        }
                        transition.next();
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