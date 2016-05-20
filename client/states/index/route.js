'use strict';
import Vue from 'vue'
import Tpl from './template.html'
import Value from './value'
import './style.less'

let Index = Vue.extend({
    //replace : true, //必须注释掉 不然动画失效
    template : Tpl,
    init : function () {
        
    },
    ready : function(){ //做浏览器判断 和 兼容
        $.init();
        var $search = $(".search"),
            $input = $(".search-input"),
            $close = $(".search-close"),
            $svg = $(".search-svg"),
            $path = $(".search-svg__path")[0],
            initD = $svg.attr("data-init"),
            midD = $svg.attr("data-mid"),
            finalD = $svg.attr("data-active"),
            backDelay = 400,
            midAnim = 200,
            bigAnim = 400,
            animating = false;

        $(document).on("click", ".search:not(.active)", function() {
            if (animating) return;
            animating = true;
            $search.addClass("active");

            Snap($path).animate({"path": midD}, midAnim, mina.backin, function() {
                Snap($path).animate({"path": finalD}, bigAnim, mina.easeinout, function() {
                    $input.addClass("visible");
                    $input.focus();
                    $close.addClass("visible");
                    animating = false;
                });
            });

        });

        $(document).on("click", ".search-close", function() {
            if (animating) return;
            animating = true;
            $input.removeClass("visible");
            $close.removeClass("visible");
            $search.removeClass("active");

            setTimeout(function() {
                Snap($path).animate({"path": midD}, bigAnim, mina.easeinout, function() {
                    Snap($path).animate({"path": initD}, midAnim, mina.easeinout, function() {
                        animating = false;
                    });
                });
            }, backDelay);
        });

    },
    data : ()=>{
        return Value
    },
    methods: {

    },
    computed : {
       
    },
    route : {
        data : function(){
           
        }
    }
})

export default Index