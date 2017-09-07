const webpack = require('webpack');
      HtmlWebpackPlugin = require('html-webpack-plugin');
      ExtractTextPlugin = require('extract-text-webpack-plugin');
      merge = require('webpack-merge');
      webpackBaseConfig = require('./webpack.base.config.js');
      UglifyJSPlugin = require('uglifyjs-webpack-plugin');
      ReplacePlugin = require('webpack-plugin-replace');
      fs = require('fs');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
      
const PATHS   = require('./PATHS'),
      UTIL = require('./UTIL'); 

// 写入环境变量
/*fs.open(PATHS.ROOT.join('/config/ENV.js'), 'w', function (err, fd) {
    const buf = 'export default "product";';
    fs.write(fd, buf, 0, buf.length, 0, function (err, written, buffer){});
});*/
//配置
var webpackDevConfig = merge(webpackBaseConfig, {
    output: {
        publicPath:'/distEfficacy/',
    },
    plugins: [
        new ExtractTextPlugin({
            filename:'css/[name].css',
            allChunks: true
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: {removeAll: true } ,map:{inline:false}},
            canPrint: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'js/vendors.js',
            warn:false
        }),
        new UglifyJSPlugin(),
        new ReplacePlugin({
            include: PATHS.SERVICES.join('xhr'),
            values: {
                //更换接口域名 - sh
                "rootPath = rootPathConf": 'rootPath = "//beta-workflow.m.jd.com"',
                //更换接口域名 - bj
                "rootPathCore = rootPathCoreConf": 'rootPathCore = "//hd.jd.com/api"',
                //更换接口域名 - bj new
                "rootPathBj = rootPathBjConf": 'rootPathBj = "//mac.jd.com"',
                //更换接口调用方式
                "env = envConfig": 'env = "beta"'
            }
        })
    ]
});

//html files
UTIL.generateHtml(webpackDevConfig, PATHS.DIST.join('/pages/'));
module.exports = webpackDevConfig;