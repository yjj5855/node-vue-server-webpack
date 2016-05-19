'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _env = require('../../env');

var vueServer = require('vue-server');
var Vue = new vueServer.renderer();
Vue.config.debug = false;
Vue.config.silent = true;

exports.default = Vue;

//# sourceMappingURL=vueServerFactory.js.map