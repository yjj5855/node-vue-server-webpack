'use strict'

var MyPlugin = {};
MyPlugin.install = function (Vue, option) {
    
    // 设置cookie
    Vue.cookie = function (key, value, options) {
        var days, time, result, decode;

        if (arguments.length > 1 && String(value) !== "[object Object]") {
            // Enforce object
            options = $.extend({}, options)

            if (value === null || value === undefined) options.expires = -1

            if (typeof options.expires === 'number') {
                days = (options.expires * 24 * 60 * 60 * 1000)
                time = options.expires = new Date()

                time.setTime(time.getTime() + days)
            }

            value = String(value)

            return (document.cookie = [
                encodeURIComponent(key), '=',
                options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '',
                '; path=/',
                options.domain ? '; domain=' + options.domain : '',
                options.secure ? '; secure' : ''
            ].join(''))
        }

        // Key and possibly options given, get cookie
        options = value || {}

        decode = options.raw ? function (s) { return s } : decodeURIComponent

        return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null
    };
    
    // 返回上一页
    Vue.prototype.goBack = function(_this){
        let path;
        try{
            path = _this.$router._currentTransition.from.path;
            if(path){
                if(path.match('member') && !$.localStorage.getItem('webapp_userInfo')){
                    _this.$router.replace('/cookbook/1')
                }else{
                    window.history.back();
                }
            }else{
                _this.$router.replace('/cookbook/1')
            }
        }catch (e){
            console.log(e)
            _this.$router.replace('/cookbook/1')
        }
    };

    // 判断设备环境
    Vue.prototype.$device = function(key){
        return $.device[key];
    };

    // 简单封装本地存储
    $.localStorage = {
        getItem : function(key){
            if (typeof localStorage === 'object') {
                try {
                    return JSON.parse(localStorage.getItem(key));
                } catch (e) {
                    alert('本站无痕浏览模式,请关闭后再试!');
                }
            }
        },
        setItem : function(key,value){
            if (typeof localStorage === 'object') {
                try {
                    return localStorage.setItem(key,JSON.stringify(value));
                } catch (e) {
                    alert('请关闭[无痕浏览]模式后再试!');
                }
            }
        },
        removeItem : function(key){
            if (typeof localStorage === 'object') {
                try {
                    return localStorage.removeItem(key);
                } catch (e) {
                    alert('请关闭[无痕浏览]模式后再试!');
                }
            }
        },
        getUseSize : function(){
            if (typeof localStorage === 'object') {
                try {
                    return JSON.stringify(localStorage).length;
                } catch (e) {
                    alert('请关闭[无痕浏览]模式后再试!');
                }
            }
        }
    };

    //全局ajax设置
    $.ajaxSettings.timeout = 5000;
    
    $.ajaxSettings.complete = function(xhr, status){
        //console.log('status=',status)
        if(status == 'abort'){
            $.toast('请求失败');
        }else if(status == 'timeout'){
            $.toast('请求超时');
        }else if(status == 'error'){
            try {
                let error = JSON.parse(xhr.responseText);
                $.toast(error.message);
            }catch(e){
                $.toast('服务器错误');
            }
        }
    };

    Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "H+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

};
export default MyPlugin;