'use strict';
import Vue from 'vue'
import Tpl from './template.html'
import Value from './value'
import './style.less'
import {searchLiveRoom} from '../../../service/douyuService'

let Index = Vue.extend({
    //replace : true, //必须注释掉 不然动画失效
    template : Tpl,
    init : function () {
        
    },
    ready : function(){ //做浏览器判断 和 兼容
        
        //需要初始化一下,不然监听不到infinite事件
        $.init();

    },
    data : ()=>{
        return Value
    },
    methods: {
        async loadList(){
            try{
                let keyword = this.$route.params.keyword;
                let data = await searchLiveRoom(keyword,this.page);
                if(data && data.status == 200){
                    this.page += 1;
                    this.douyuList.total = data.total;
                    setTimeout(()=>{
                        this.showAnimation = false;
                    },data.items.length * this.stagger)
                    this.showAnimation = true;
                    for(let i=0;i<data.items.length;i+=1){
                        this.douyuList.items.push(data.items[i])
                    }
                }
            }catch (error){
                $.toast('请求斗鱼失败')
            }
        }
    },
    computed : {
       isLoadOver(){
           return this.douyuList.items.length >= parseInt(this.douyuList.total);
       }
    },
    route : {
        data : function(transition){
            let keyword = transition.to.params.keyword;
            this.loadList();
        },
        deactivate : function (transition) {
            this.douyuList = {
                items : [],
                total : 0
            };
            this.page = 1;
            transition.next();
        }
    }
})

export default Index