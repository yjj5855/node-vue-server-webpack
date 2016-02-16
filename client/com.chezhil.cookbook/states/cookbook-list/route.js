'use strict';
import Vue from 'vue'
import Tpl from './template.html'
import Q from 'q'
import cookbookService from '../../service/cookbook.service'

let Index = Vue.extend({
    //replace : true, //必须注释掉 不然动画失效
    template : Tpl,
    ready : function(){ //做浏览器判断 和 兼容
        let loading = false;
        //$('#class_tab').attr('data-offset',$('header.bar.bar-nav')[0].offsetHeight-1)
        //绑定无限滚动事件
        $('.infinite-scroll-bottom').on('infinite',()=>{
            if(loading){ return; }
            loading = true;

            cookbookService.getCookbookList(this.id,this.page).then((data)=>{
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
            });

        });

        //绑定下拉刷新事件
        $('.pull-to-refresh-content').on('refresh',()=>{
            if(loading){ return; }
            loading = true;

            this.page = 1;
            cookbookService.getCookbookList(this.id,this.page).then((data)=>{
                this.page += 1;
                this.updateTime = new Date().getTime();
                this.cookbookItems = data.tngou;
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

        //需要初始化一下,不然监听不到infinite事件
        $.init();

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
            updateTime : '',
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
            this.$router.go('/cookbook/1');
        },
        goRoute(route){
            $('body').removeClass('with-panel-left-reveal');
            this.$router.go(route);
        },
        scrollTabBtn(id){
            console.log('动画id=',id);
            let class_id = id;
            let $el = $('.tab-link.button.class_'+class_id);
            let el = $el[0];
            if($el.length == 0 ){
                return;
            }

            let scrollLeft = el.offsetLeft - el.parentNode.offsetLeft;
            let scrollLeft_active = $('#class_tab')?$('#class_tab')[0].scrollLeft:0;

            if(scrollLeft_active - scrollLeft < 0){
                for(let i=0;i<50;i++){
                    (function(){
                        setTimeout(()=>{
                            $('#class_tab').scrollLeft(Math.abs(scrollLeft_active+(scrollLeft-scrollLeft_active)/50*i)-i);
                        },5*i)
                    })()
                }
            }else{
                for(let i=0;i<50;i++){
                    (function(){
                        setTimeout(()=>{
                            $('#class_tab').scrollLeft(scrollLeft-(scrollLeft_active-scrollLeft)/50*i-i);
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
            this.title = '菜谱列表';
            if(typeof localStorage.getItem('cookbook_classes') == 'string'){
                this.cookbookClasses = JSON.parse(localStorage.getItem('cookbook_classes'));
            }
            //如果是服务端渲染的,应该设置全局变量,那么客户端就不用异步请求数据了
            if(window.cm_cookbookItems && window.cm_cookbookItems.id == transition.to.params.id){
                console.log('应该只进入一次');
                this.$data = window.cm_cookbookItems;
                delete window.cm_cookbookItems;
                setTimeout(()=>{
                    this.scrollTabBtn(transition.to.params.id)
                },3e2);
                transition.next();
            }
            else if(typeof localStorage.getItem('cookbook_list_'+transition.to.params.id) == 'string'){
                //本地如果有数据的话拿本地数据
                let cookbook = JSON.parse(localStorage.getItem('cookbook_list_'+transition.to.params.id));
                this.id = cookbook.id;
                this.page = cookbook.page;
                this.cookbookItems = cookbook.cookbookItems;
                this.maxItems = cookbook.maxItems;
                this.updateTime = cookbook.updateTime;

                setTimeout(()=>{
                    $.init();
                    this.scrollTabBtn(this.id);
                },3e2);
                transition.next();
            }
            else{
                $.showPreloader();
                //没有本地数据再去请求数据
                let qa_id = transition.to.params.id;

                let promise = [
                    cookbookService.getCookbookList(qa_id,1)
                ];
                if(typeof localStorage.getItem('cookbook_classes') != 'string'){
                    promise.push(cookbookService.getCookbookClass());
                }

                Q.all(promise).then((data)=>{
                    $.hidePreloader();
                    let data0 = data[0];
                    if(data0.status){
                        this.id = qa_id;
                        this.page = 2;
                        this.cookbookItems = data0.tngou;
                        this.maxItems = data0.total;
                    }else{
                        transition.abort();
                    }
                    if(data.length > 1){
                        this.cookbookClasses = data[1].tngou;
                    }
                    setTimeout(()=>{
                        $.init();
                        this.scrollTabBtn(qa_id);
                    },3e2);
                    transition.next();
                }).catch((e)=>{
                    $.hidePreloader();
                    $.toast("操作失败");
                    transition.abort();
                })
            }
        },
        canReuse: function(transition){
            return true;
        }
    }
})

export default Index