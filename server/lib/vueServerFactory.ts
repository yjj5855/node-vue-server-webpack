'use strict'
import {config} from '../../env'
let vueServer = require('vue-server')
let Vue = new vueServer.renderer();
Vue.config.debug = !(config.NODE_ENV == 'product');
Vue.config.silent = (config.NODE_ENV == 'product');


export default Vue;