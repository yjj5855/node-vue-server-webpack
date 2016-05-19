'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _env = require('../../env');

var _env2 = _interopRequireDefault(_env);

var _setWindowDate = require('../lib/setWindowDate');

var _setWindowDate2 = _interopRequireDefault(_setWindowDate);

var _vueServerFactory = require('../lib/vueServerFactory');

var _vueServerFactory2 = _interopRequireDefault(_vueServerFactory);

var _pandaService = require('../api/pandaService');

var service = _interopRequireWildcard(_pandaService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

//页面模板
// let tpl = fs.readFileSync(config.PATH_WEBAPP + '/states/index/template.html', 'utf-8');

exports.default = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:

                        // let data = await service.searchLiveRoom('守望先锋');
                        // console.log(data);

                        res.render('layout', (0, _setWindowDate2.default)(req, '<div></div>'));

                    case 1:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function (_x, _x2) {
        return ref.apply(this, arguments);
    };
}();

//# sourceMappingURL=search.js.map