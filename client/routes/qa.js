'use strict';
import Vue from '../lib/vue.min'
import cmQa from '../../components/qa/qa'
import cmComment from '../../components/comment/comment'

let Index = Vue.extend({
    replace : false,
    template : `
    <p>This is qa id={{$route.params.id}}</p>
    <cm-qa :qa_content="content" :qa_title="title"></cm-qa>
    <cm-comment :type="type" :id="id"></cm-comment>
    `,
    components: {
        'cm-article': cmQa(Vue),
        'cm-comment': cmComment(Vue)
    },
    data : ()=>{

    },
    route : {
        data : function(transition) {
            //如果是服务端渲染的,应该设置全局变量,那么客户端就不用异步请求数据了
            if(window.cm_qa && window.cm_qa.id == transition.to.params.id){
                this.$data = window.cm_qa;
                transition.next();
            }else{
                let qa_id = transition.to.params.id;
                setTimeout(()=> {
                    this.$data = {
                        title : '客户端问答标题',
                        content:[
                            { id : 2 }
                        ],
                        type: 'qa',
                        id  : qa_id
                    };
                    transition.next();
                },2e3)
            }
        }
        ,
        canActivate: function(){

        },
        activate: function (transition) {
            console.log('qa activated!')
            transition.next()
        },
        deactivate: function (transition) {
            console.log('hook-example deactivated!')
            transition.next()
        }
    }
})

export default Index