'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.searchLiveRoom = undefined;


//异步函数

var searchLiveRoom = exports.searchLiveRoom = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(keyword) {
        var page = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        return _context.abrupt('return', (0, _requestPromise2.default)(_apiService2.default.searchDouyuLiveRoom + '/search/' + _querystring2.default.escape(keyword) + '?' + _querystring2.default.stringify({
                            type: 2,
                            page: page
                        })));

                    case 1:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function searchLiveRoom(_x, _x2) {
        return ref.apply(this, arguments);
    };
}();

//解析斗鱼的html


exports.formatJsonByHtml = formatJsonByHtml;

var _apiService = require('../lib/apiService');

var _apiService2 = _interopRequireDefault(_apiService);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function formatJsonByHtml(rawHtml) {
    var $ = _cheerio2.default.load(rawHtml);

    var $list = $('ul.search_result_list>li>a').toArray();
    var jsonList = new Array($list.length);
    for (var i = 0; i < $list.length; i++) {
        jsonList[i] = {
            title: '',
            href: '',
            img: '',
            nick: '',
            person: 0,
            type: '',
            isliving: false
        };
        var $children = getVideoHrefAndTitle(jsonList[i], $list[i]);
        getOtherAttribute(jsonList[i], $children);
    }

    var $page = $('#turn-page .ui-button:not(.next)').toArray();
    var total = $page[$page.length - 1].children[0].data * 15;

    return {
        status: 200,
        total: total,
        items: jsonList
    };
}

function getVideoHrefAndTitle(item, $html) {
    item.href = $html.attribs ? $html.attribs.href : '';
    return $html.children;
}

function getOtherAttribute(item, $children) {
    for (var i = 0; i < $children.length; i += 1) {
        var $child = $children[i];

        if ($child.type == 'tag' && $child.name == 'span') {

            //获取直播预览图
            if ($child.attribs && $child.attribs.class == 'img') {
                var $img = $child.children;
                item.img = $img[0].attribs['data-original'];
            }
        } else if ($child.type == 'tag' && $child.name == 'div') {

            if ($child.attribs && $child.attribs.class == 'mes') {

                for (var j = 0; j < $child.children.length; j++) {
                    var $ch = $child.children[j];

                    if ($ch.type == 'tag' && $ch.name == 'div' && $ch.attribs.class == 'mesDivOne') {

                        item.title = $ch.children[0].children[0].data;
                        item.type = $ch.children[1].children[0].data;
                    } else if ($ch.type == 'tag' && $ch.name == 'div') {

                        item.nick = $ch.children[0].children[0].children[0].data;
                        item.person = $ch.children[0].children[1].children[0].data;
                    }
                }
            }
        } else if ($child.type == 'tag' && $child.name == 'i') {

            if ($child.attribs && $child.attribs.class == 'icon_live') {
                item.isliving = true;
            }
        }
    }
}

//# sourceMappingURL=douyuService.js.map