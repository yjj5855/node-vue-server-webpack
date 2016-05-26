import api from '../lib/apiService'
import request from 'request-promise'
import querystring from 'querystring'
import cheerio from 'cheerio'


export async function searchLiveRoom(keyword,page=1) {
    return request(api.searchBiliLiveRoom + '/' + (page > 1 ? page : '') + '?' + querystring.stringify({
        keyword: keyword,
        type: 'all'
    }))
}

export function formatJsonByHtml(rawHtml) {
    let $ = cheerio.load(rawHtml);

    let $list_a = $('ul.room-list>li>a').toArray();
    let $list_img = $('ul.room-list>li .listVimg img').toArray();
    let $list_avatar = $('ul.room-list>li .face img').toArray();
    let $list_title = $('ul.room-list>li .listVtitle').toArray();
    let $list_nick = $('ul.room-list>li .upInfo .upTitle').toArray();
    let $list_person = $('ul.room-list>li .upInfo .peopleNum').toArray();
    let $list_page = $('ul.page>li>:not(.lastpage)').toArray();

    let jsonList = new Array($list_a.length);
    for (let i = 0; i < $list_a.length; i++) {
        jsonList[i] = {
            title: $list_title[i].children[0].data,
            href: $list_a[i].attribs.href,
            img: $list_img[i].attribs.src,
            avatar: $list_avatar[i].attribs.src,
            nick: $list_nick[i].children[0].data,
            person: $list_person[i].children[0].data,
            isliving: true
        };
    }
    let total = 0;
    try {
        total = $list_page[$list_page.length - 1].children[0].data * 42;
    } catch (err) {}

    return {
        status: 200,
        total: total,
        items: jsonList
    };
}