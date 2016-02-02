'use strict';

module.exports = function(Vue,fs,data){
    var tpl;
    if(fs){
        tpl = fs.readFileSync(__dirname+'/qa.tpl.html','utf-8');
    }else{
        tpl = require('./qa.tpl.html');
    }

    var Qa = Vue.component('cm-qa',{
        props : ['qa_title','qa_content','qa_id'],
        template : tpl,
        data : function(){
            return {
                id : this.qa_id,
                title : this.qa_title,
                content : this.qa_content
            }
        },
    });

    return Qa;
}