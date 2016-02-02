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
        <div class="content infinite-scroll infinite-scroll-bottom" id="cookbook_{{id}}">
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
              <!-- 加载提示符 -->
              <div class="infinite-scroll-preloader">
                  <div class="preloader"></div>
              </div>
        </div>
    </div>
    `,
    ready : function(){
        let loading = false;
        // 最多可加载的条目
        let maxItems = 0;

        $('.infinite-scroll-bottom').on('infinite',()=>{
            if(loading){ return; }
            loading = true;

            this.loadCookbook(this.id,this.page).then((data)=>{
                this.page += 1;
                for(let i=0;i<=data.tngou.length;i++){
                    if(data.tngou[i]){
                        this.cookbookItems.push(data.tngou[i])
                    }
                }
                maxItems = data.total;

                loading = false;
                if(this.cookbookItems.length >= maxItems){
                    //解绑无限加载事件
                    $.detachInfiniteScroll($('.infinite-scroll'));
                    // 删除加载提示符
                    $('.infinite-scroll-preloader').remove();
                    return;
                }
            }).catch(()=>{
                console.error('出错啦');
            })
        });
        $.init(); //需要初始化一下,不然监听不到infinite事件
    },
    data : ()=>{
        return {
            id : 0,
            page : 1,
            title : '菜谱列表',
            cookbookItems : [],
            maxItems : 100,
        }
    },
    methods: {
        goBack(){
            this.$router.go('/cookbook');
        },
        loadCookbook(id,page){
            return new Promise((success,error)=>{
                let resource = this.$resource('http://apis.baidu.com/tngou/cook/list');
                resource.get({id:id,page:page}).then((response)=>{
                    if(response.status == 200 && response.data.status){
                        success(response.data)
                    }else{
                        error()
                    }
                });
            })

        }
    },
    route : {
        data : function(transition){
            //如果是服务端渲染的,应该设置全局变量,那么客户端就不用异步请求数据了
            if(window.cm_cookbookItems && window.cm_cookbookItems.id == transition.to.params.id){
                this.$data = window.cm_cookbookItems;
                transition.next();
            }else{
                let qa_id = transition.to.params.id;
                $.showPreloader();
                let resource = this.$resource('http://apis.baidu.com/tngou/cook/list');
                resource.get({id: qa_id,page:1}).then((response)=>{
                    $.hidePreloader();
                    if(response.status == 200){
                        this.$data = {
                            id : qa_id,
                            page : 2,
                            title : '菜谱列表',
                            cookbookItems : response.data.tngou
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