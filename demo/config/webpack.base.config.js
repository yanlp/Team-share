/*多页面webpack2+vue2页面配置*/
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let VENDORS = require('./VENDORS'),
    PATHS = require('./PATHS'),
    PORTS = require('./PORTS'),
    UTIL = require('./UTIL');

//conf - postcss
let postcssConf = {
    loader: 'postcss-loader',
    options: {
        sourceMap: true,
        config: {
            path: 'config/postcss.config.js'
        }
    }
};


//配置开始
let baseConfig = {
    //入口
    entry: {
        vendors: VENDORS
    },
    output: {
        path: PATHS.DIST,
        filename: 'js/[name].js',
        chunkFilename: 'js/[id][name].js'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    css: ExtractTextPlugin.extract({
                        fallback: 'vue-style-loader',
                        use: [
                            'css-loader?sourceMap',
                            postcssConf
                        ],
                    }),
                    scss: ExtractTextPlugin.extract({
                        fallback: 'vue-style-loader',
                        use: [
                            'css-loader?sourceMap',
                            postcssConf,
                            'sass-loader?sourceMap'
                        ]
                    })
                }
            }
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env'],
                    plugins: ['transform-runtime']
                }
            }
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader?sourceMap?minimize',
                    postcssConf
                ]
            })
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader?sourceMap',
                    postcssConf,
                    'sass-loader?sourceMap'
                ]
            })
        }, {
            test: /\.(gif|jpg|png)\??.*$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    name: 'img/[name].[ext]?[hash]'
                }
            }
        }, {
            test: /\.(woff|svg|eot|ttf)\??.*$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    name: 'fonts/[name].[ext]?[hash]'
                }
            }
        }/*, {
            test: /\.(html|tpl)$/,
            use: 'html-loader'
        }*/]
    },
    resolve: {
        modules: ['node_modules'],
        // require时省略的扩展名，如：require('module') 不需要module.js
        extensions: ['.js', '.vue', '.json'],
        // 别名，可以直接使用别名来代表设定的路径以及其他
        alias: {
            ROOT: PATHS.ROOT,
            // 自定义路径别名
            MOCK: PATHS.MOCK,
            ASSETS: PATHS.SRC.join('assets'),
            // COMPONENTS: PATHS.SRC.join('components'),
            // DIRECTIVES: PATHS.SRC.join('directives'),
            // FILTERS: PATHS.SRC.join('filters'),
            // SERVICES: PATHS.SRC.join('services'),
            // LIBS: PATHS.SRC.join('libs'),
            VIEWS: PATHS.SRC.join('views')
        },
    }
};

// 多入口  entry object 配置
let entries = UTIL.getEntry('./src/views/**/*.js');
Object.assign(baseConfig.entry, entries);

//exports
module.exports = baseConfig;