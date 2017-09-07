/*
    代理配置更改后，需要重启服务器才能生效
 */

module.exports = {
    //页面-主标题
    title: '营销中台数据中心',
    //环境切换
    env: 'proxy',        //local:本地数据|proxy:代理数据请求(代理服务会默认启动)
    /*proxy: {
        '*(/workflowHome|/menu|/helpCenter|/logout|/announcementList|/announcement|/activity|/seckill|/recommendActivity)': {
            //target: 'http://workflow.m.jd.com',
            target: 'http://beta-workflow.m.jd.com',
            changeOrigin: true,
            withCredentials: true,
            secure: false   //https
        },
        '*(/activity/**|/apply/**|/area/**|/common/**|/batch/**|/formset/**|/resource/**|/check/**|/app/**|/customized/**|/message/**|/qualification/**|/cmscard/**|/whitelist/**|/contacts/**|/batch/**)':{
            target: 'http://mac.jd.com',
            changeOrigin: true,
            withCredentials: true,
            secure: false   //https
        }
    }*/

    //代理配置-不同域名(预发|线上)
    proxy: [{
        context: ['/menu'],
        target: 'http://beta-workflow.m.jd.com',
        changeOrigin: true,
        withCredentials: true,
        secure: false   //https
    },{
        context: ['/activity/**', '/area/**', '/common/**','/effact/**'],
        target: 'http://mac.jd.com',
        changeOrigin: true,
        withCredentials: true,
        secure: false   //https
    }]
}
