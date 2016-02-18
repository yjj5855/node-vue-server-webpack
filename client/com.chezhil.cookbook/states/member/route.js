'use strict';
import Vue from 'vue'
import Tpl from './template.html'
import './style.css'
import carService from '../../service/car.service'

let Index = Vue.extend({
    //replace : true, //必须注释掉 不然动画失效
    template : Tpl,
    ready : function(){
        $.init();

        carService.getCarBrandList().then((data)=>{
            this.carBrandList = data;
        });
    },
    data : ()=>{
        return {
            carBrandList : [],
            carSeriesList: [],
            carTypeList  : [],

            carBrandId : 0,
            carSeriesId: 0,
            carTypeId  : 0
        }
    },
    methods: {
        goRoute(route){
            this.$router.go(route);
        },
        goBack(){
            let path;
            try{
                path = this.$route.router._prevTransition.to.path;
                this.$router.go(path)
            }catch (e){
                this.$router.go('/cookbook/1')
            }
        },
        openCarSeriesPopup(carBrandId){
            this.carBrandId = carBrandId;
            $.popup('.popup-car-series');
        }
    },
    computed : {
        isWeiXin : function(){
            return $.device.isWeixin;
        }
    },
    route : {
        data : function(transition){
            //如果是服务端渲染的,应该设置全局变量,那么客户端就不用异步请求数据了
            transition.next()
        },
        canActivate : function(transition){
            //没有登录的话 重定向到登录页
            //transition.redirect('/login');
            transition.next();
        }
    }
})

export default Index