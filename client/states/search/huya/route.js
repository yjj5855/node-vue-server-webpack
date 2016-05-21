'use strict';
import Vue from 'vue'
import Tpl from './template.html'
import Value from './value'
import './style.less'
import {searchLiveRoom} from '../../../service/huyaService'

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
                if(data && data.responseHeader && data.responseHeader.status == 0){
                    let list = data.response[3].docs;
                    let total =  data.response[3].numFound;
                    this.huyaList.total = total;
                    setTimeout(()=>{
                        this.showAnimation = false;
                    },list.length * this.stagger)
                    this.showAnimation = true;
                    for(let i=0;i<list.length;i+=1){
                        this.huyaList.items.push(list[i])
                    }
                    this.page += 1;
                }
            }catch (error){
                $.toast('请求虎牙直播失败')
            }
        }
    },
    computed : {
       isLoadOver(){
           return this.huyaList.items.length >= parseInt(this.huyaList.total);
       }
    },
    route : {
        data : function(transition){
            let keyword = transition.to.params.keyword;
            this.loadList();
        },
        deactivate : function (transition) {
            this.huyaList = {
                items : [],
                total : 0
            };
            this.page = 1;
            transition.next();
        }
    }
})

export default Index