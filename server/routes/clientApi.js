'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.huya = exports.panda = undefined;

var panda = exports.panda = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
        var keyword, page, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        keyword = req.params.keyword;
                        page = req.query.page;
                        _context.next = 4;
                        return service.searchLiveRoom(keyword, page);

                    case 4:
                        data = _context.sent;


                        res.json(data);

                    case 6:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function panda(_x, _x2) {
        return ref.apply(this, arguments);
    };
}();

var huya = exports.huya = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res) {
        var keyword, page, data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        keyword = req.params.keyword;
                        page = req.query.page;
                        _context2.next = 4;
                        return huyaService.searchLiveRoom(keyword, page);

                    case 4:
                        data = _context2.sent;


                        res.json(data);

                    case 6:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function huya(_x3, _x4) {
        return ref.apply(this, arguments);
    };
}();

var _pandaService = require('../api/pandaService');

var service = _interopRequireWildcard(_pandaService);

var _huyaService = require('../api/huyaService');

var huyaService = _interopRequireWildcard(_huyaService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

//# sourceMappingURL=clientApi.js.map