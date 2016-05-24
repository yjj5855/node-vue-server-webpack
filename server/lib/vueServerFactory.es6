
let vueServer = require('vue-server')
let Vue = new vueServer.renderer();
Vue.config.debug = false;
Vue.config.silent = true;


export default Vue;