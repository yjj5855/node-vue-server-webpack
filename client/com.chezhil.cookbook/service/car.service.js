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

function getCarSeriesList(brandId){
    return Q.Promise((success,error)=>{
        if(typeof localStorage.getItem('car_series_'+brandId) == 'string'){
            success(JSON.parse(localStorage.getItem('car_series_'+brandId)));
        }else{
            $.ajax({
                type : 'GET',
                url  : config.API_BASE_HOST+'getseries',
                data : {
                    brandId : brandId
                },
                headers : {

                },
                success : function(response){
                    console.log(response)
                    if(response.code == 200){
                        localStorage.setItem('car_series_'+brandId,JSON.stringify(response.data))
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

function getCarTypeList(seriesId){
    return Q.Promise((success,error)=>{
        if(typeof localStorage.getItem('car_type_'+seriesId) == 'string'){
            success(JSON.parse(localStorage.getItem('car_type_'+seriesId)));
        }else{
            $.ajax({
                type : 'GET',
                url  : config.API_BASE_HOST+'getcartype',
                data : {
                    seriesId : seriesId
                },
                headers : {

                },
                success : function(response){
                    console.log(response)
                    if(response.code == 200){
                        localStorage.setItem('car_type_'+seriesId,JSON.stringify(response.data))
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

let carService = {
    getCarBrandList : getCarBrandList,
    getCarSeriesList : getCarSeriesList,
    getCarTypeList: getCarTypeList
};

export default carService;