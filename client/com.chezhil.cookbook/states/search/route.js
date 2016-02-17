'use strict';
import Vue from 'vue'
import Tpl from './template.html'

let Index = Vue.extend({
    //replace : true, //必须注释掉 不然动画失效
    template : Tpl,
    ready : function(){
        $.init();

        $('#search').on('keypress',(e)=>{
            let keyCode = null;
            if(e.which)
                keyCode = e.which;
            else if(e.keyCode)
                keyCode = e.keyCode;

            if(keyCode == 13) {
                console.log('按了回车',this.keyword);
                this.search(this.keyword);
                return false;
            }else{
                console.log('不是回车');
                this.showSearchContent = false;
            }
            return true;
        })
    },
    data : ()=>{
        return {
            keyword : '',
            searchHistory : [],
            searchContent : [],
            showSearchContent : false,
        }
    },
    methods: {
        goBack(){
            let path;
            try{
                path = this.$route.router._prevTransition.to.path;
                this.$router.go(path)
            }catch (e){
                this.$router.go('/cookbook/1')
            }
        },
        search(keyword){
            this.searchHistory.push(keyword);
            this.showSearchContent = true;
        },
        deleteSearchHistory(index){
            console.log('index',index)
            if(index == -1){
                this.searchHistory = [];
            }else if(index>=0){
                this.searchHistory.splice(index,1);
                console.log(this.searchHistory)
            }
        }
    },
    computed : {

    },
    route : {
        data : function(transition){
            //如果是服务端渲染的,应该设置全局变量,那么客户端就不用异步请求数据了
            transition.next()
        }
    }
})

export default Index