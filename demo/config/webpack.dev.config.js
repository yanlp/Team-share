const webpack = require('webpack'),
    merge = require('webpack-merge'),
    fs = require('fs'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    webpackBaseConfig = require('./webpack.base.config.js'),
    OpenBrowserPlugin = require('open-browser-webpack-plugin');
    FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const PATHS = require('./PATHS'),
    PORTS = require('./PORTS'),
    CONFIG = require('./CONFIG'),
    UTIL = require('./UTIL');

//配置
var webpackDevConfig = merge(webpackBaseConfig, {
    devtool: '#source-map',
    output: {
        publicPath: 'http://localhost:' + PORTS.BROWSER_SYNC + '/views/',
    },
    plugins: [
        new ExtractTextPlugin({
            filename: PATHS.SRC.join('css/[name].css'),
            // filename:'css/[name].css',
            disable: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new webpack.optimize.CommonsChunkPlugin('vendors'),
        new FriendlyErrorsPlugin(),
        new OpenBrowserPlugin({ url: 'http://localhost:'+PORTS.BROWSER_SYNC+'/views/' })
    ],
    devServer: {
        port: PORTS.BROWSER_SYNC,
        noInfo: false,
        proxy: CONFIG.proxy,
        hot: true,
        inline: true,
        compress: false
    }
});


//html files
UTIL.generateHtml(webpackDevConfig);
module.exports = webpackDevConfig;