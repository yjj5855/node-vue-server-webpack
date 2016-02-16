'use strict';
import Vue from 'vue'
import Tpl from './template.html'
import Q from 'q'



let Index = Vue.extend({
    //replace : true, //必须注释掉 不然动画失效
    template : Tpl,
    init : function(){
        this.firstLoaded = true;
    },
    ready : function(){ //做浏览器判断 和 兼容
        let loading = false;

        //$('#class_tab').attr('data-offset',$('header.bar.bar-nav')[0].offsetHeight-1)
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
            if(loading){ return; }
            loading = true;

            this.page = 1;
            this.loadCookbook(this.id,this.page).then((data)=>{
                this.page += 1;
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
            //setTimeout(()=>{
                this.$router.go(route);
            //},1e3)
        },
        loadCookbook(id,page){
            let self = this;
            return Q.Promise((success,error)=>{
                let resource = this.$resource('http://apis.baidu.com/tngou/cook/list');
                resource.get({id:id,page:page}).then((response)=>{
                    if(response.status == 200 && response.data.status){
                        //拿第一页的时候保存到本地
                        if(page == 1){
                            localStorage.setItem('cookbook_list_'+id,JSON.stringify({
                                id : id,
                                updateTime : new Date().getTime(),
                                page : 2,
                                cookbookItems : response.data.tngou,
                                maxItems : response.data.total
                            }));
                            self.updateTime = new Date().getTime();
                        }
                        success(response.data)
                    }else{
                        error()
                    }
                });
            })

        },
        scrollTabBtn(class_id){
            //setTimeout(()=>{
                let $el = $('.tab-link.button.class_'+class_id);
                let el = $el[0];
                if($el.length == 0 ){
                    return;
                }

                let scrollLeft = el.offsetLeft - el.parentNode.offsetLeft;
                let scrollLeft_active = $('#class_tab')?$('#class_tab').scrollLeft():0;

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
            //})
        }
    },
    computed : {
        isShowLoad : function(){
            return this.maxItems > this.cookbookItems.length;
        }
    },
    route : {
        data : function(transition){
            let firstLoaded;
            this.title = '菜谱列表';
            if(typeof localStorage.getItem('cookbook_classes') == 'string'){
                this.cookbookClasses = JSON.parse(localStorage.getItem('cookbook_classes'));
            }
            //如果是服务端渲染的,应该设置全局变量,那么客户端就不用异步请求数据了
            if(window.cm_cookbookItems && window.cm_cookbookItems.id == transition.to.params.id && this.firstLoaded){
                this.$data = window.cm_cookbookItems;
                this.firstLoaded = false;
                transition.next();
            }else if(typeof localStorage.getItem('cookbook_list_'+transition.to.params.id) == 'string'){
                //本地如果有数据的话拿本地数据
                let cookbook = JSON.parse(localStorage.getItem('cookbook_list_'+transition.to.params.id));
                this.id = cookbook.id;
                this.page = cookbook.page;
                this.cookbookItems = cookbook.cookbookItems;
                this.maxItems = cookbook.maxItems;
                this.updateTime = cookbook.updateTime;

                this.scrollTabBtn(this.id);
                transition.next();
            }else{
                $.showPreloader();
                //没有本地数据再去请求数据
                let qa_id = transition.to.params.id;
                let resource = this.$resource('http://apis.baidu.com/tngou/cook/list');
                let resourceClass = this.$resource('http://apis.baidu.com/tngou/cook/classify');

                let promise = [
                    resource.get({id: qa_id,page:1})
                ];
                if(typeof localStorage.getItem('cookbook_classes') != 'string'){
                    promise.push(resourceClass.get({ id: 0 }));
                }

                Q.all(promise).then((data)=>{
                    $.hidePreloader();
                    let data0 = data[0];
                    if(data0.status == 200){
                        this.id = qa_id;
                        this.page = 2;
                        this.cookbookItems = data0.data.tngou;
                        this.maxItems = data0.data.total;

                        this.scrollTabBtn(qa_id);

                        localStorage.setItem('cookbook_list_'+qa_id,JSON.stringify({
                            id : qa_id,
                            updateTime : new Date().getTime(),
                            page : 2,
                            cookbookItems : data0.data.tngou,
                            maxItems : data0.data.total
                        }));

                    }else{
                        transition.abort();
                    }
                    if(data.length > 1){
                        let data1 = data[1];
                        this.cookbookClasses = data1.data.tngou;
                        localStorage.setItem('cookbook_classes',JSON.stringify(data1.data.tngou));
                    }
                    transition.next();
                }).catch(()=>{
                    $.toast("操作失败");
                })
            }
        },
        canReuse: false
    }
})

export default Index