'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.searchLiveRoom = undefined;

var searchLiveRoom = exports.searchLiveRoom = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(keyword) {
        var page = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        return _context.abrupt('return', (0, _requestPromise2.default)(_apiService2.default.searchZhanqiLiveRoom + '?' + _querystring2.default.stringify({
                            q: keyword,
                            t: 'live'
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

    var $list_a = $('ul.live-list>li>a').toArray();
    var $list_img = $('ul.live-list>li>a .imgBox img').toArray();
    var $list_title = $('ul.live-list>li>a .info-area .name').toArray();
    var $list_nick = $('ul.live-list>li>a .info-area .meat .anchor').toArray();
    var $list_type = $('ul.live-list>li>a .info-area .meat .game-name').toArray();
    var $list_person = $('ul.live-list>li>a .info-area .meat>.views>span.dv').toArray();

    var jsonList = new Array($list_a.length);
    for (var i = 0; i < $list_a.length; i++) {

        var title = '';
        for (var j = 0; j < $list_title[i].children.length; j++) {
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

//# sourceMappingURL=zhanqiService.js.map