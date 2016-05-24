import api from '../lib/apiService'
import request from 'request-promise'
import querystring from 'querystring'
import cheerio from 'cheerio'


export async function searchLiveRoom(keyword,page=1) {
    return request(api.searchDouyuLiveRoom + '/search/' + querystring.escape(keyword) + '?' + querystring.stringify({
            type: 2,
            page: page
        }))
}

export function formatJsonByHtml(rawHtml) {
    let $ = cheerio.load(rawHtml);

    let $list_a = $('ul.search_result_list>li>a').toArray();
    let $list_img = $('ul.search_result_list>li span.img img').toArray();
    let $list_title = $('ul.search_result_list>li span.title').toArray();
    let $list_type = $('ul.search_result_list>li span.zbName').toArray();
    let $list_nick = $('ul.search_result_list>li .moreMes .nnt').toArray();
    let $list_person = $('ul.search_result_list>li .moreMes .view').toArray();
    let $list_isliving = $('ul.search_result_list>li i.icon_live').toArray();

    let jsonList = new Array($list_a.length);
    for (let i = 0; i < $list_a.length; i++) {
        jsonList[i] = {
            title: $list_title[i].children[0].data,
            href: $list_a[i].attribs.href,
            img: $list_img[i].attribs['data-original'],
            type: $list_type[i].children[0].data,
            nick: $list_nick[i].children[0].data,
            person: $list_person[i].children[0].data,
            isliving: !!$list_isliving[i]?true:false
        };
    }

    let total = 0;
    try {
        let $page = $('#turn-page .ui-button:not(.next)').toArray();
        total = $page[$page.length - 1].children[0].data * 15;
    } catch (err) {}

    return {
        status: 200,
        total: total,
        items: jsonList
    };
}