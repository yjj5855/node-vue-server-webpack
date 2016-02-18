import Q from 'q'
import {config} from '../../../env'

function getCarBrandList(){

    return Q.Promise((success,error)=>{

        if(typeof localStorage.getItem('car_brands') == 'string'){
            success(JSON.parse(localStorage.getItem('car_brands')));
        }else{
            $.ajax({
                type : 'GET',
                url  : config.API_BASE_HOST+'getbrand?all=true',
                data : {

                },
                headers : {

                },
                success : function(response){
                    console.log(response)
                    if(response.code == 200){
                        localStorage.setItem('car_brands',JSON.stringify(response.data))
                        success(response.data)
                    }
                },
                error : function(xhr){
                    error('请求失败')
                }
            });
        }
    })
}

function getCarSeriesList(){
    if(typeof localStorage.getItem('cookbook_classes') == 'string'){
        return localStorage.getItem('cookbook_classes');
    }
    return Q.Promise((success,error)=>{

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

    })
}

function getCarTypeList(id){
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

let carService = {
    getCarBrandList : getCarBrandList,
    getCarSeriesList : getCarSeriesList,
    getCarTypeList: getCarTypeList
};

export default carService;