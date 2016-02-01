'use strict';
import Vue from '../lib/vue.min'

let Foo = Vue.extend({
    replace : false,
    template: '<p>This is foo!</p>'
})

export default Foo