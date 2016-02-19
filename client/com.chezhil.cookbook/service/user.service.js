import Q from 'q'
import {config} from '../../../env'

/**
 *
 * @param code 微信CODE
 * @param from 来源 可以是用户ID 或者渠道标识
 */
function getUserInfoByWinXinCode(code,from) {
    return Q.Promise((success,error)=>{
        $.ajax({
            type : 'GET',
            url  : config.API_WX_HOST+'callback/userinfobycode',
            data : {
                seriesId : seriesId
            },
            headers : {

            },
            success : function(response){
                if(response.code == 200){
                    success(response.data)
                }
            },
            error : function(xhr){
                error('请求失败')
            }
        });
    })
}

let userService = {
    getUserInfoByWinXinCode : getUserInfoByWinXinCode,
};

export default userService;