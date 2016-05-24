import * as pandaService from '../api/pandaService'
import * as huyaService from '../api/huyaService'
import * as douyuService from '../api/douyuService'
import * as biliService from '../api/biliService'
import * as zhanqiService from '../api/zhanqiService'

export async function panda(req, res) {
    let keyword = req.params.keyword;
    let page = req.query.page;
    let data = await pandaService.searchLiveRoom(keyword,page);

    res.json(data)
}

export async function huya(req, res) {
    let keyword = req.params.keyword;
    let page = req.query.page;
    let data = await huyaService.searchLiveRoom(keyword,page);

    res.json(data)
}

export async function douyu(req, res) {
    let keyword = req.params.keyword;
    let page = req.query.page;
    let html = '',data = {}
    try {
        html = await douyuService.searchLiveRoom(keyword,page);
        data = douyuService.formatJsonByHtml(html);
    }catch (err){
        console.log(err);
        res.json({status : 200})
        res.end()
    }

    res.json(data)
}

export async function bili(req, res) {
    let keyword = req.params.keyword;
    let page = req.query.page;
    let html = '',data = {}
    try {
        html = await biliService.searchLiveRoom(keyword,page);
        data = biliService.formatJsonByHtml(html);
    }catch (err){
        console.log(err);
        res.json({status : 200})
        res.end()
    }

    res.json(data)
}

export async function zhanqi(req, res) {
    let keyword = req.params.keyword;
    let page = req.query.page;
    let html = '',data = {}
    try {
        html = await zhanqiService.searchLiveRoom(keyword,page);
        data = zhanqiService.formatJsonByHtml(html);
    }catch (err){
        console.log(err);
        res.json({status : 200})
        res.end()
    }

    res.json(data)
}