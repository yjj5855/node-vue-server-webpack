import Vue from '../lib/vue.min'
import cmArticle from '../../components/article'

let Index = Vue.extend({
    replace : false,
    template : `
    <p>This is article</p>
    <cm-article :article_html="html"></cm-article>
    `,
    components: {
        'cm-article': cmArticle(Vue)
    },
    data : ()=>{
        return {
            html: `<h3>哈哈哈</h3>`,
        }
    }
})

export default Index