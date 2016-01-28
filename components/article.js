//import Vue from '../public/javascripts/vue.min'



module.exports = function(Vue){

    var Article = Vue.component('cm-article',{
        props : ['article_html'],
        template : `
    <div>{{{ article_html }}}</div>
    `,
        data : function(){
            return {
                html : this.article_html
            }
        }
    });

    return Article;
}