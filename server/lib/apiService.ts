'use strict'
import {config} from '../../env'
import * as request from 'request-promise'
import queryString = require('querystring');

//获取菜谱分类
export async function getCookbookClass(){
    let options = {
        method: 'GET',
        url: 'http://apis.baidu.com/tngou/cook/classify?'+queryString.stringify({
            id : 0,
        }),
        headers: {
            //百度API的开放接口凭证
            'apikey': 'a369f43a6392605426433831e10765ec'
        },
        json : true
    };

    return request(options).promise();
}

//获取菜谱分类中的列表
export async function getCookbookList(cookbook_id){
    let options = {
        method: 'GET',
        url: 'http://apis.baidu.com/tngou/cook/list?'+queryString.stringify({
            id : cookbook_id,
            page : 1,
            rows : 20
        }),
        headers: {
            //百度API的开放接口凭证
            'apikey': 'a369f43a6392605426433831e10765ec'
        },
        json : true
    };

    return request(options).promise();
}
