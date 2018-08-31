/*
    代理配置更改后，需要重启服务器才能生效
 */

module.exports = {
    // 页面-主标题
    title: '京东营销活动中心',
    // 环境切换
    env: 'proxy', // local:本地数据|proxy:代理数据请求(代理服务会默认启动), mockUrl
    /* proxy: {
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
    // 代理配置-不同域名(预发|线上)
    // 参考：https://github.com/chimurai/http-proxy-middleware#context-matching
    proxy: [{
        context: [
            '@(/workflowHome)',
            '*(/menu)',
            '*(/announcementList)',
            '*(/announcement)',
            '*(/helpCenter)',
            '*(/helpCenterMenu)',
            '@(/logout)',
            '@(/seckill)',
            '@(/recommendActivity)',
            '@(/activity)',
        ],
        //target: 'http://workflow.m.jd.com',
        //target: 'http://beta-workflow.m.jd.com',
        target:'http://platgw-beta.jd.com/workflow',
        // target:'http://platgw-gw.jd.com/workflow',
        changeOrigin: true,
        withCredentials: true,
        secure: false, // https
    },{ // mock接口数据
        context: [
            '*(/mc/**)'
        ],
        target: 'http://192.168.108.227:7001/mock/59c3723651c38d5f10dd724a',
        changeOrigin: true,
        withCredentials: true,
        secure: false   //https
    }, { // hd.jd.com
        context: [
            '*(/json/channelItemList/isOperatorErpLogin.action)'
        ],
        target: 'http://hd.jd.com',
        changeOrigin: true,
        withCredentials: true,
        secure: false   //https 
    }, {
        context: [
            '/nodeApi/**'
        ],
        target: 'http://mcmidbeta.jd.com', 
        // target: 'http://mcmid.jd.com', // 不绑mac域名host
        changeOrigin: true,
        withCredentials: true,
        secure: false   //https
    },
     {
        context: [
            '/activity/**',
            '/apply/**',
            '/area/**',
            '/common/**',
            '/watch/**',
            '/batch/**',
            '/formset/**',
            '/resource/**',
            '/customized/**',
            '/contacts/**',
            '/message/**',
            '/check/**',
            '/app/**',
            '/qualification/**',
            '/cmscard/**',
            '/qualificationTemplateUserRelation/**',
            '/whitelist/**',
            '/viewCheck/**',
            '/autochooseProduct/**'
        ],
        target: 'http://mac.jd.com',
        changeOrigin: true,
        withCredentials: true,
        secure: false, // https
    }],
};
