/*
 * requirejs配置
 *
 * 说明：requirejs整体使用配置，gulp构建时也是使用这份配置，保证了配置统一。
 *
 * // mustache: '../../bower_components/mustache.js/mustache',
 * 
 */
// require.js config
var require = {
    baseUrl: "./js/",
    //baseUrl: "http://10.8.135.101:3000/src/js/",
    paths: {
        zepto: 'zepto',
        echarts: 'echarts/echarts'
    },
    shim: {
        'zepto': {
            exports: '$',
        }
    }
};