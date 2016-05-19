'use strict';
import Vue from 'vue'
import Tpl from './template.html'
import Value from './value'
import './style.less'
import {searchLiveRoom} from '../../../service/pandaService'

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
                if(data && data.errno == 0){
                    this.pandaList.total = data.data.total;
                    for(let i=0;i<data.data.items.length;i+=1){
                        this.pandaList.items.push(data.data.items[i])
                    }
                    this.page += 1;
                }
            }catch (error){
                $.toast('请求熊猫TV失败')
            }
        }
    },
    computed : {
       isLoadOver(){
           return this.pandaList.items.length >= parseInt(this.pandaList.total);
       }
    },
    route : {
        data : function(transition){
            let keyword = transition.to.params.keyword;
            this.loadList();
        },
        deactivate : function (transition) {
            this.pandaList = {
                items : [],
                total : 0
            };
            this.page = 1;
            transition.next();
        }
    }
})

export default Index