import Vue from 'vue'
import Q from 'q'

let listService = Vue.resource('http://apis.baidu.com/tngou/cook/list');
let classService = Vue.resource('http://apis.baidu.com/tngou/cook/classify');

function getCookbookList(id,page){
    return Q.Promise((success,error)=>{
        listService.get({id:id,page:page}).then((response)=>{
            if(response.status == 200 && response.data.status){
                //拿第一页的时候保存到本地
                if(page == 1){
                    localStorage.setItem('cookbook_list_'+id,JSON.stringify({
                        id : id,
                        updateTime : new Date().getTime(),
                        page : 2,
                        cookbookItems : response.data.tngou,
                        maxItems : response.data.total
                    }));
                }
                success(response.data)
            }else{
                error('请求失败')
            }
        }).catch((e)=>{
            error(e)
        })
    })
}

function getCookbookClass(){
    if(typeof localStorage.getItem('cookbook_classes') == 'string'){
        return localStorage.getItem('cookbook_classes');
    }
    return Q.Promise((success,error)=>{
        classService.get({id:0}).then((response)=>{
            if(response.status == 200 && response.data.status){
                localStorage.setItem('cookbook_classes',JSON.stringify(response.data.tngou));
                success(response.data)
            }else{
                error('请求失败!')
            }
        }).catch((e)=>{
            error(e)
        })
    })
}

let cookbookService = {
    getCookbookList : getCookbookList,
    getCookbookClass : getCookbookClass
};

export default cookbookService;