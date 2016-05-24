import api from '../lib/apiService'
import request from 'request-promise'
import querystring from 'querystring'
import cheerio from 'cheerio'


export async function searchLiveRoom(keyword,page=1) {
    return request(api.searchZhanqiLiveRoom + '?' + querystring.stringify({
            q: keyword,
            t: 'live'
        }))
}

export function formatJsonByHtml(rawHtml) {
    let $ = cheerio.load(rawHtml);

    let $list_a = $('ul.live-list>li>a').toArray();
    let $list_img = $('ul.live-list>li>a .imgBox img').toArray();
    let $list_title = $('ul.live-list>li>a .info-area .name').toArray();
    let $list_nick = $('ul.live-list>li>a .info-area .meat .anchor').toArray();
    let $list_type = $('ul.live-list>li>a .info-area .meat .game-name').toArray();
    let $list_person = $('ul.live-list>li>a .info-area .meat>.views>span.dv').toArray();

    let jsonList = new Array($list_a.length);
    for (let i = 0; i < $list_a.length; i++) {

        let title = '';
        for (let j = 0; j < $list_title[i].children.length; j++) {
            if ($list_title[i].children[j].type == 'tag' && $list_title[i].children[j].name == 'em') {
                title += '<b>' + $list_title[i].children[j].children[0].data + '</b>';
            } else {
                title += $list_title[i].children[j].data;
            }
        }
        jsonList[i] = {
            title: title,
            href: $list_a[i].attribs.href,
            img: $list_img[i].attribs.src,
            nick: $list_nick[i].children[0].data,
            type: $list_type[i].children[0].data,
            person: $list_person[i].children[0].data,
            isliving: true
        };
    }

    return {
        status: 200,
        items: jsonList
    };
}