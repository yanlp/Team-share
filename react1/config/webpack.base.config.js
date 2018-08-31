/*多页面webpack2+vue2页面配置*/
let PATHS = require('./PATHS'),
    UTIL = require('./UTIL');
//配置开始
let baseConfig = {
    context: PATHS.ROOT,
    //入口
    entry: {
        vendors: [
            'vue',
            // 'iview'
            'iview/dist/styles/iview.css',
            PATHS.SRC.join('assets/common.scss')
        ]
    },
    output: {
        path: PATHS.DIST,
        filename: 'js/[name].js',
        chunkFilename: 'js/[id][name].js'
    },
    performance: {
        hints: false,
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
           
        }, {
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
                // loader:'happypack/loader?id=babel'
            },
            
        },{
            test: /\.css$/,
            use:  [
               'vue-style-loader',
                "css-loader",
              ]
        },
        {
            test: /\.(sass|scss)$/,
            use: [
                // MiniCssExtractPlugin.loader,
                'vue-style-loader',
                "css-loader",
                "sass-loader",
                // 'postcss-loader'
            ]

        }, {
            test: /\.(gif|jpg|png)\??.*$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name].[ext]?[hash]'
                }
            }
        }, {
            test: /\.(woff|svg|eot|ttf)\??.*$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 3072,
                    name: 'fonts/[name].[ext]?[hash]'
                }
            }
        }],
        noParse: function(content) { // content 从入口开始解析的模块路径
            return /iviews/.test(content); // 返回true则忽略对no-parser.js的解析
        }
    },
    resolve: {
        // root: PATHS.ROOT,
        modules: ["src/assets", 'node_modules'],
        // require时省略的扩展名，如：require('module') 不需要module.js
        extensions: ['.js', '.vue', '.json'],
        // 别名，可以直接使用别名来代表设定的路径以及其他
        alias: {
            ROOT: PATHS.ROOT,
            // 自定义路径别名
            MOCK: PATHS.MOCK,
            ASSETS: PATHS.SRC.join('assets'),
            COMPONENTS: PATHS.SRC.join('components'),
            DIRECTIVES: PATHS.SRC.join('directives'),
            FILTERS: PATHS.SRC.join('filters'),
            SERVICES: PATHS.SRC.join('services'),
            LIBS: PATHS.SRC.join('libs'),
            VIEWS: PATHS.SRC.join('views'),
            MIXINS: PATHS.SRC.join('mixins'),
        },
    }
};

// 多入口  entry object 配置
let entries = UTIL.getEntry('./src/views/**/*.js');
Object.assign(baseConfig.entry, entries);

//exports
module.exports = baseConfig;