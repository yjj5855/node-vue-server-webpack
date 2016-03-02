
//计算时间差
export default function(Vue){
    Vue.filter('time-diff',function(dateTime){
        var date1=new Date(dateTime);  //开始时间
        var date2=new Date();    //结束时间

        var date3=date2.getTime()-date1.getTime()  //时间差的毫秒数


        //计算出相差天数
        var days=Math.floor(date3/(24*3600*1000))

        //计算出小时数
        var leave1=date3%(24*3600*1000)    //计算天数后剩余的毫秒数
        var hours=Math.floor(leave1/(3600*1000))

        //计算相差分钟数
        var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数
        var minutes=Math.floor(leave2/(60*1000))

        //计算相差秒数
        var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
        var seconds=Math.round(leave3/1000)

        if(days>0){
            return days+'天'
        }else if(hours > 0){
            return hours+'小时'
        }else if(minutes > 0){
            return minutes+'分钟'
        }else if(seconds > 0 ){
            return seconds+'秒'
        }else{
            return '刚刚'
        }
    });
}