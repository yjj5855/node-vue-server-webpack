'use strict';
import Vue from '../lib/vue.min'

let Bar = Vue.extend({
    replace : false,
    template: '<p>This is bar!</p>',
})

export default Bar