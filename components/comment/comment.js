'use strict';

module.exports = function(Vue,fs,data){
    var tpl;
    if(fs){
        tpl = fs.readFileSync(__dirname+'/comment.tpl.html','utf-8');
    }else{
        tpl = require('./comment.tpl.html');
    }

    var Comment = Vue.component('cm-comment',{
        props : ['type','id'],
        template : tpl,
        data : function(){
            return {
                comment_list : [
                    {
                        id : 1,
                        name : '张三'
                    }
                ]
            }
        }
    });

    return Comment;
}