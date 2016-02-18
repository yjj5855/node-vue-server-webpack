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

            carBrand : {
                brand_id   : 0,
                brand_name : ''
            },
            carSeries : {
                id : 0,
                name : ''
            },
            carType  : {
                id : 0,
                name : ''
            },

            myCarInfo : {
                brand_id   : 0,
                brand_name : '',
                series_id  : 0,
                series_name: '',
                type_id    : 0,
                type_name  : ''
            }
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
        openCarSeriesPopup(carBrand){
            if(this.carBrand.brand_id == carBrand.brand_id){

            }else{
                this.carBrand = carBrand;

                this.carSeries = {};
                this.carSeriesList = [];

                this.carType = {};
                this.carTypeList = [];
            }

            carService.getCarSeriesList(carBrand.brand_id).then((data)=>{
                this.carSeriesList = data;
                $.popup('.popup-car-series');
            });
        },
        chooseCarSeries(carSeries){
            if(this.carSeries.id == carSeries.id){

            }else{
                this.carSeries = carSeries;

                this.carType = {};
                this.carTypeList = [];
            }

            carService.getCarTypeList(carSeries.id).then((data)=>{
                this.carTypeList = data;
            });
        },
        chooseCarType(carType){
            this.carType = carType;
        },
        saveCar(){
            if(!this.carType.id > 0){
                $.toast('请选择车型年份');
                return;
            }
            this.myCarInfo = {
                brand_id   : this.carBrand.brand_id,
                brand_name : this.carBrand.brand_name,
                series_id  : this.carSeries.id,
                series_name: this.carSeries.name,
                type_id    : this.carType.id,
                type_name  : this.carType.name
            };
            $.closeModal('.popup-car-series');
            $.closeModal('.popup-car-brand');
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