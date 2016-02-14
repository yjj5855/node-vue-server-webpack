'use strict';
import Vue from 'vue'
import Tpl from './template.html'

let Index = Vue.extend({
    //replace : false, //必须注释掉 不然动画失效
    template : Tpl,
    ready : function(){
        let loading = false;

        $('.buttons-tab.fixed-tab').attr('data-offset',$('header.bar.bar-nav')[0].offsetHeight-1)
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
                if(this.maxItems == -1){
                    this.maxItems = data.total;
                }
                loading = false;

            }).catch(()=>{
                console.error('出错啦');
            })
        });

        $('.pull-to-refresh-content').on('refresh',()=>{
            console.log()
            if(loading){ return; }
            loading = true;

            this.page = 1;
            this.loadCookbook(this.id,this.page).then((data)=>{
                this.page += 1;
                this.cookbookItems = data.tngou
                if(this.maxItems > 0){
                    this.maxItems = data.total;
                }
                loading = false;
                // 加载完毕需要重置
                $.pullToRefreshDone('.pull-to-refresh-content');
            }).catch(()=>{
                console.error('出错啦');
                //加载完毕需要重置
                $.pullToRefreshDone('.pull-to-refresh-content');
            })
        });
        $.init(); //需要初始化一下,不然监听不到infinite事件
        if(!this.isShowLoad){
            //解绑无限加载事件
            $.detachInfiniteScroll($('.infinite-scroll'));
            // 删除加载提示符
            $('.infinite-scroll-preloader').remove();
        }
    },
    data : ()=>{
        return {
            cookbookClasses : [],
            id : 0,
            page : 1,
            title : '菜谱列表',
            cookbookItems : [],
            maxItems : -1,
        }
    },
    methods: {
        goCookbook(id){
            this.$router.go('/cookbook/'+id);
        },
        goCookbookDetail(id){
            this.$router.go('/cookbookDetail/'+id);
        },
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

        },
        scrollTabBtn(class_id){
            let el = $('.tab-link.button.class_'+class_id)[0];
            let scrollLeft = el.offsetLeft - el.parentNode.offsetLeft;

            let scrollLeft_active = $('.buttons-tab.fixed-tab')?$('.buttons-tab.fixed-tab').scrollLeft():0;

            if(scrollLeft_active - scrollLeft < 0){
                for(let i=0;i<50;i++){
                    (function(){
                        setTimeout(()=>{
                            $('.buttons-tab.fixed-tab').scrollLeft(Math.abs(scrollLeft_active+(scrollLeft-scrollLeft_active)/50*i)-i);
                        },5*i)
                    })()
                }
            }else{
                for(let i=0;i<50;i++){
                    (function(){
                        setTimeout(()=>{
                            $('.buttons-tab.fixed-tab').scrollLeft(scrollLeft-(scrollLeft_active-scrollLeft)/50*i-i);
                        },5*i)
                    })()
                }
            }
        }
    },
    computed : {
        isShowLoad : function(){
            return this.maxItems > this.cookbookItems.length;
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
                        this.$data.id = qa_id,
                        this.$data.page = 2,
                        this.$data.title ='菜谱列表';
                        this.$data.cookbookItems = response.data.tngou;
                        this.$data.maxItems = response.data.total;

                        this.scrollTabBtn(qa_id);
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
            this.$data = window.cm_cookbookItems;
            transition.next()
        },
        deactivate: function (transition) {
            window.cm_cookbookItems = this.$data;
            transition.next()
        }
    }
})

export default Index