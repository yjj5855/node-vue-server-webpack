'use strict';
import Vue from '../lib/vue.min'
import cmArticle from '../../components/article/article'
import cmComment from '../../components/comment/comment'

let Index = Vue.extend({
    replace : false,
    template : `
    <cm-article :article_html="html"></cm-article>
    <cm-comment :type="type" :id="id"></cm-comment>
    `,
    components: {
        'cm-article': cmArticle(Vue),
        'cm-comment': cmComment(Vue)
    },
    data : ()=>{
        return {
            html: `
            <div class="body fl_l" style="padding: 10px;"><h3>新车甲醛浓度严重超标！怎么破？</h3><p>作者：车知了_知哥</p><p><span style="color: rgb(62, 62, 62);"><br></span></p><p><span style="color: rgb(62, 62, 62);">对于新购买的汽车，不少车主会觉得车内有刺鼻难闻的气味，而这种异味就来自人们常说的甲醛。此时，大部分车主会选择用空气清新剂或车载香水来掩盖，但这治标不治本，不能从根本上清除有害气体。</span></p><p style="color: rgb(62, 62, 62);background-color: rgb(255, 255, 255);"><img src="http://7te93u.com2.z0.glb.qiniucdn.com/jq1.webp.jpg" style="width: 100%;"><br></p><p style="color: rgb(62, 62, 62);background-color: rgb(255, 255, 255);"><br></p><p style="color: rgb(62, 62, 62);background-color: rgb(255, 255, 255);"><strong>新车味道刺鼻难闻</strong></p><p style="color: rgb(62, 62, 62);background-color: rgb(255, 255, 255);">“刚从4S店提的新车，总觉得有股难闻的味道，朋友也说一打开车门就能闻到。”车主魏先生近日买了辆新车，为了打理方便，还特意去汽车用品店换了一套真皮座椅，新车里本来就有味道，再夹杂着真皮味道就更难闻了。</p><p style="color: rgb(62, 62, 62);background-color: rgb(255, 255, 255);"><br></p><p style="color: rgb(62, 62, 62);background-color: rgb(255, 255, 255);">隔壁老张告诉我，买车之后他居然连续咳嗽了几天，刚开始以为是感冒引起的，吃了止咳药也不见好转，去医院检查，医生说有轻微的支气管炎症状，是<br>由过敏导致的，让他寻找过敏源。“我一听是由过敏导致的，我便开始怀疑是新车的问题，每次我一进车里，就闻到一股很浓的刺激性气味，每当开车的时候我就连续咳嗽，我怀疑是车内甲醛浓度过高的原因。”老张说。<br></p><p style="color: rgb(62, 62, 62);background-color: rgb(255, 255, 255);"><img src="http://7te93u.com2.z0.glb.qiniucdn.com/jq2.webp.jpg" style="width: 100%;"><br></p><p style="color: rgb(62, 62, 62);background-color: rgb(255, 255, 255);"><br></p><p style="color: rgb(62, 62, 62);background-color: rgb(255, 255, 255);">无独有偶，隔壁老李也有相同经历，在大型企业上班的他花了9万多元买了一辆经济型代步车，刚提车时就发现车内异味严重，只要一关闭车窗还熏眼睛，想到新车都有这样的问题，所以就没有太过在意，只是买车载香水来掩盖车里的味道。</p><p style="color: rgb(62, 62, 62);background-color: rgb(255, 255, 255);">“没想到这个味道4个月之后还没有消除，我经常开车一坐进车内就头晕，想到孩子还小需经常接送，担心车内空气会对孩子健康造成影响，我就叫来做室内装修的朋友，按照新房装修完的方式测试了空气质量，没想到检测出来的结果是甲醛超标。”<span>隔壁老李说，即便是冬天，开车时都是将车窗全部开启，即便寒风吹起来很刺骨，为了能尽快将车内甲醛浓度降低，也就只能忍一忍了。</span></p><p style="color: rgb(62, 62, 62);background-color: rgb(255, 255, 255);"><br></p><p style="color: rgb(62, 62, 62);background-color: rgb(255, 255, 255);"><strong>新车刺鼻气味从何而来</strong></p><p style="color: rgb(62, 62, 62);background-color: rgb(255, 255, 255);">“新车内难闻的气味，大部分是由于甲醛或是笨含量超标所引起的。”据本市一4S店售后技术人员介绍，车内空气污染主要有三个，<span style="color: rgb(255, 41, 65);"><strong>首先是车内各种配件，如座垫和座椅面料等，其次是车内饰，如车内地板、车顶装饰布和门把手等，最后是车辆使用的各种油漆、稀释剂和胶粘剂等。<br></strong></span></p><p style="color: rgb(62, 62, 62);background-color: rgb(255, 255, 255);"><img src="http://7te93u.com2.z0.glb.qiniucdn.com/jq3.webp.jpg" style="width: 100%;"><br></p><p style="color: rgb(62, 62, 62);background-color: rgb(255, 255, 255);"><br></p><p style="color: rgb(62, 62, 62);background-color: rgb(255, 255, 255);">“车内甲醛主要来源于汽车仪表盘的塑料件、车顶毡、座椅表皮及填充物和其他装饰物使用的塑料材料。”<span>售后技术说，有些高端品牌的新车异味主要来自阻尼片，那是一种贴在车身钢板壁的弹性材料，能起到减小噪声、减少振动的作用，但是甲醛浓度过高。</span></p><p style="color: rgb(62, 62, 62);background-color: rgb(255, 255, 255);">“现在车辆维修喷漆行业，使用最普遍的是传统油性涂料，这种涂料中含有挥发性的化合物，这些物质含有刺激性气味，挥发在空气中对人体有害。”售后技术表示，由于汽车空间狭小，加上密封性较好，车内空气本来就不流通，因此汽车内的有害气体超标比室内有害气体超标对人体危害更大。</p><p style="color: rgb(62, 62, 62);background-color: rgb(255, 255, 255);">售后技术提醒广大市民，不论是高档车还是中低档车，都会有不同程度的车内空气污染，车内的皮制座椅、顶棚织物、塑料装饰件等部位内含有甲醛，有的车主可能就加了一副脚垫，都会导致车内甲醛浓度偏高。　</p><p style="color: rgb(62, 62, 62);text-align: center;background-color: rgb(255, 255, 255);"><br></p><p style="color: rgb(62, 62, 62);background-color: rgb(255, 255, 255);"><strong>去除甲醛有妙招</strong></p><p style="color: rgb(62, 62, 62);background-color: rgb(255, 255, 255);">“对于购买新车的车主，上车之前先打开车门让车内透透气，开车时最好将车窗打开，天气寒冷时，只要留一条缝隙都能减轻新车刺鼻的气味。”大部分车主面对车内难闻的气味，多采用空气清洗剂和车载香水，这只能掩盖车内的气味，是治标不治本。<br></p><p style="color: rgb(62, 62, 62);background-color: rgb(255, 255, 255);"><img src="http://7te93u.com2.z0.glb.qiniucdn.com/jq4.webp.jpg" style="width: 100%;"><br></p><p style="color: rgb(62, 62, 62);background-color: rgb(255, 255, 255);"><br></p><p style="color: rgb(62, 62, 62);background-color: rgb(255, 255, 255);">“车主可以选择放置一些竹炭包，将买来的竹炭用透气性好的纱布包好，放置在后备箱或是中控面板，这样能吸附车内甲醛。”胡伟表示，如果对车内空气质量要求严格的车主，可以选择安装一台空气净化器，不仅能清楚甲醛、苯等有害气体，还能起到杀菌的作用。</p><p style="color: rgb(62, 62, 62);background-color: rgb(255, 255, 255);">“当车辆闲置时，可以放置一小桶的清水，在水里加一些醋，水在蒸发时可以吸附甲减，醋能起到稳定甲醛的作用。”无论是刚买的新车，还是已经开了几年的老车，去汽车养护中心做除甲醛的护理，空气质量会好得多。</p><!--EndFragment--><p><br></p></div>
            `,
            type: 'article',
            id  : 1
        }
    }
})

export default Index