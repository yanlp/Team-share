const webpack = require('webpack');
const path = require('path');
const {join, resolve} = path;
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const webpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin  = require("html-webpack-plugin");
const baseConfig = require('./webpack.base.config.js');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

const pluginExtra = new ExtractTextWebpackPlugin({
    filename: 'css/[name].css',
    ignoreOrder: true,
    allChunks: true,
    disable: true
})
const  config = webpackMerge(baseConfig, {
    mode: 'development',
    devServer: {
        contentBase: join(__dirname, '../dist'),
        port: 9090
    },
    plugins: [
        pluginExtra,
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(['dist'], {
            root: resolve(__dirname, '../'),
            verbose: true,
            dry: true,
            watch: true
        }),
        new HtmlWebpackPlugin({
            title: '再次尝试',
            filename: 'index.html',
            template: './src/index.html',
            inject: 'body',
            hash: true,
        }),
        new OpenBrowserPlugin({ url: 'http://localhost:9090' })
    ],
})
module.exports = config;
