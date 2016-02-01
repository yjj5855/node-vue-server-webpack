'use strict';

module.exports = function(Vue,fs){
    var tpl;
    if(fs){
        tpl = fs.readFileSync(__dirname+'/article.tpl.html','utf-8');
    }else{
        tpl = require('./article.tpl.html');
    }

    var Article = Vue.component('cm-article',{
        props : ['article_html'],
        template : tpl,
        data : function(){
            return {
                html : this.article_html
            }
        }
    });

    return Article;
}