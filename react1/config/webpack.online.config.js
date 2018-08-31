const webpack = require('webpack'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      merge = require('webpack-merge'),
      ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin'),
      webpackBaseConfig = require('./webpack.base.config.js'),
      ReplacePlugin = require('webpack-plugin-replace'),
      fs = require('fs');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader')
const PATHS   = require('./PATHS'),
      UTIL = require('./UTIL'); 

//配置
var webpackDevConfig = merge(webpackBaseConfig, {
    output: {
        path: PATHS.ROOT.join('dist2Online'),    //文件路径
        publicPath: '/dist2/',                  // 资源路径
    },
    optimization: {
        splitChunks: {
            chunks: 'async', // 只对入口处理
            name: true
        },
        minimizer: [
            new ParallelUglifyPlugin({
                cacheDir: PATHS.ROOT.join('/.cache'),
                uglifyJs: {
                    compress: {
                        warnings: false
                    }
                }
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename:'css/[name].css',
            // allChunks: true
        }),
        new webpack.HashedModuleIdsPlugin(),
        //作用域提升,提升代码在浏览器执行速度
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ParallelUglifyPlugin({
            cacheDir: PATHS.ROOT.join('/.cache'),
            uglifyJs: {
                compress: {
                    warnings: false
                }
            }
        }),
        new ReplacePlugin({
            include: PATHS.SERVICES.join('xhr'),
            values: {
                //更换接口域名 - sh
                "rootPath = rootPathConf": 'rootPath = "//plat-gw.jd.com/workflow"',
                //更换接口域名 - bj
                "rootPathCore = rootPathCoreConf": 'rootPathCore = "//hd.jd.com/api"',
                //更换接口域名 - bj new
                "rootPathBj = rootPathBjConf": 'rootPathBj = "//mac.jd.com"',
                //更换接口域名 - node
                "rootNode = rootNodeConf": 'rootNode = "//mcmid.jd.com/nodeApi"',
                //更换接口调用方式
                "env = envConfig": 'env = "prod"'
            }
        })
    ]
});

//html files
UTIL.generateHtml(webpackDevConfig, PATHS.ROOT.join('dist2Online/pages/'));
module.exports = webpackDevConfig;