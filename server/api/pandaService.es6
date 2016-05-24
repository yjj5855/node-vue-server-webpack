import api from '../lib/apiService'
import request from 'request-promise'
import querystring from 'querystring'


export async function searchLiveRoom(keyword,page=1) {
    let options = {
        method: 'GET',
        url: api.searchPandaLiveRoom + '?' + querystring.stringify({
            name: keyword,
            status: 2,
            order_cond: 'fans',
            pageno: page,
            pagenum: 20
        }),
        json: true
    };
    return request(options)
}