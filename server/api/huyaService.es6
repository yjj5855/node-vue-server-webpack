import api from '../lib/apiService'
import request from 'request-promise'
import querystring from 'querystring'


export async function searchLiveRoom(keyword,page=1) {
    let options = {
        method: 'GET',
        url: api.searchHuyaLiveRoom + '/?' + querystring.stringify({
            m: 'Search',
            do: 'getSearchContent',
            q: keyword,
            uid: 0,
            app: 11,
            v: 4,
            typ: -5,
            rows: 20,
            start: (page - 1) * 20
        }),
        json: true
    };
    return request(options)
}