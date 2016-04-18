'use strict';
import Q from 'q'

function getCookbookList(id,page){
    return Q.Promise((success,error)=>{
        $.ajax({
            type : 'GET',
            url  : 'http://apis.baidu.com/tngou/cook/list',
            data : {
                id : id ,
                page : page
            },
            headers : {
                apikey : 'a369f43a6392605426433831e10765ec'
            },
            success : function(response){
                if(response.status){
                    //拿第一页的时候保存到本地
                    if(page == 1){
                        localStorage.setItem('cookbook_list_'+id,JSON.stringify({
                            id : id,
                            updateTime : new Date().getTime(),
                            page : 2,
                            cookbookItems : response.tngou,
                            maxItems : response.total
                        }));
                    }else{
                        let oldValue = JSON.parse(localStorage.getItem('cookbook_list_'+id));
                        for(let i=0;i<response.tngou.length;i++){
                            oldValue.cookbookItems.push(response.tngou[i]);
                        }
                        oldValue.page = ++page;
                        oldValue.maxItems = response.total
                        localStorage.setItem('cookbook_list_'+id,JSON.stringify(oldValue))
                    }
                    success(response)
                }else{
                    error('请求失败')
                }
            },
            error : function(xhr){
                error('请求失败')
            }
        });
    })
}

function getCookbookClass(){
    
    return Q.Promise((success,error)=>{
        
        let classes = $.localStorage.getItem('cookbook_classes')
        if(classes){
            success(classes);
        }else{
            $.ajax({
                type : 'GET',
                url  : 'http://apis.baidu.com/tngou/cook/classify',
                data : {
                    id : 0
                },
                headers : {
                    apikey : 'a369f43a6392605426433831e10765ec'
                },
                success : function(response){
                    if(response.status){
                        localStorage.setItem('cookbook_classes',JSON.stringify(response.tngou));
                        success(response)
                    }else{
                        error('请求失败!')
                    }
                },
                error : function(xhr, errorType){
                    error('请求失败')
                }
            });

        }
       
    })
}

function getCookbookDetail(id){
    return Q.Promise((success,error)=>{
        $.ajax({
            type : 'GET',
            url  : 'http://apis.baidu.com/tngou/cook/show',
            data : {
                id : id
            },
            headers : {
                apikey : 'a369f43a6392605426433831e10765ec'
            },
            success : function(response){
                if(response.status){
                    success(response)
                }else{
                    error('请求失败')
                }
            },
            error : function(xhr, errorType){
                error('请求失败')
            }
        });
    })
}
let cookbookService = {
    getCookbookList : getCookbookList,
    getCookbookClass : getCookbookClass,
    getCookbookDetail: getCookbookDetail
};

export default cookbookService;