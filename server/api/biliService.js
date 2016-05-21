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
                        return _context.abrupt('return', (0, _requestPromise2.default)(_apiService2.default.searchBiliLiveRoom + '/' + (page > 1 ? page : '') + '?' + _querystring2.default.stringify({
                            keyword: keyword,
                            type: 'all'
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

    var $list_a = $('#list-content .vedioBlock>a').toArray();
    var $list_img = $('#list-content .listVimg img').toArray();
    var $list_avatar = $('#list-content .face img').toArray();
    var $list_title = $('#list-content .listVtitle').toArray();
    var $list_nick = $('#list-content .upInfo .upTitle').toArray();
    var $list_person = $('#list-content .upInfo .peopleNum').toArray();
    var $list_page = $('ul.page>li>:not(.lastpage)').toArray();

    var jsonList = new Array($list_a.length);
    for (var i = 0; i < $list_a.length; i++) {
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
    console.log($list_page.length + '=>', $list_page);
    var total = $list_page[$list_page.length - 1].children[0].data * 42;

    return {
        status: 200,
        total: total,
        items: jsonList
    };
}

//# sourceMappingURL=biliService.js.map