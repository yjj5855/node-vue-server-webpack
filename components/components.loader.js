'use strict';

module.exports = function(component,Vue,fs,data){
    var tpl;
    if(fs){
        tpl = fs.readFileSync(__dirname+'/'+component.tpl_path,'utf-8');
    }else{
        tpl = require('./'+component.tpl_path);
    }

    var Component = require('./'+component.js_path);

    return Component(Vue,tpl,data);
}