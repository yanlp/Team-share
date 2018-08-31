const webpack = require('webpack'),
    merge = require('webpack-merge'),
    webpackBaseConfig = require('./webpack.base.config.js'),
    FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')
//发送系统通知的一个node模块！
const opn = require('opn');

const notifier = require("node-notifier");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


process.traceDeprecation = true;

const PORTS = require('./PORTS'),
    PATHS = require('./PATHS'),
    CONFIG = require('./CONFIG'),
    UTIL = require('./UTIL');

//配置
var webpackDevConfig = merge(webpackBaseConfig, {
    mode:'development',
    devtool: 'cheap-module-eval-source-map',
    output: {
        publicPath: 'http://localhost:'+PORTS.BROWSER_SYNC+'/views/',
        // publicPath: '/',
    },
    // 提取js，lib1名字可改
	// optimization: {
	// 	splitChunks: {
	// 		cacheGroups: {
	// 			libs: {
	// 				chunks: "async",
	// 				name: "vendors",
	// 				enforce: true
	// 			}
	// 		}
	// 	}
	// },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        //开启HMR(热替换功能,替换更新部分,不重载页面！)
        new webpack.HotModuleReplacementPlugin(),
        new BundleAnalyzerPlugin(),
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: [`Your application is running here: http:`],
            },
            onErrors: function (severity, errors) {
                if (severity != "error") {
                    return
                }
                const error = errors[0];
                console.log(error)
                // 编译出错时,右上角弹出错误提示！
                notifier.notify({
                    title: "编译出错了！",
                    message: severity + ": " + error.webpackError,
                    // subtitle: filename || ""
                })
            }
        }),
    ],
    devServer: {
        proxy: CONFIG.proxy,
        contentBase: PATHS.DIST,
        quiet: true,
        port: PORTS.BROWSER_SYNC,
        hot: true,
        // host: 'localhost',
        compress: false,
        // open: true,
        /*打开浏览器 并打开本项目网址*/
        after(app) {
            // opn('http://localhost:'+PORTS.BROWSER_SYNC+'/views/',{app: ['google chrome', '--incognito']})
            opn('http://localhost:'+PORTS.BROWSER_SYNC+'/views/')
        }
    }
});
//html files
UTIL.generateHtml(webpackDevConfig);
module.exports = webpackDevConfig;