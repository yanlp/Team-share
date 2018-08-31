const webpack = require('webpack'),
      merge = require('webpack-merge'),
      webpackBaseConfig = require('./webpack.base.config.js'),
      ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin'),
      ReplacePlugin = require('webpack-plugin-replace'),
      CleanWebpackPlugin = require('clean-webpack-plugin');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader')
      
const PATHS   = require('./PATHS'),
      UTIL = require('./UTIL'); 


//配置
var webpackDevConfig = merge(webpackBaseConfig, {
    mode: 'production',
    output: {
        publicPath:'/dist2/',
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
        }),
        new webpack.HashedModuleIdsPlugin(),

        //作用域提升,提升代码在浏览器执行速度
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ReplacePlugin({
            include: PATHS.SERVICES.join('xhr'),
            values: {
                //更换接口域名 - sh
                "rootPath = rootPathConf": 'rootPath = "//platgw-beta.jd.com/workflow"',
                //更换接口域名 - bj
                "rootPathCore = rootPathCoreConf": 'rootPathCore = "//hd.jd.com/api"',
                //更换接口域名 - bj new
                "rootPathBj = rootPathBjConf": 'rootPathBj = "//mac.jd.com"',
                //更换接口域名 - node
                "rootNode = rootNodeConf": 'rootNode = "//mcmidbeta.jd.com/nodeApi"',
                //更换接口调用方式
                "env = envConfig": 'env = "beta"'
            }
        }),
        new CleanWebpackPlugin(
            ['dist2'],　 //匹配删除的文件
            {
                root: PATHS.ROOT,       　　　　　　　　　　//根目录
            })
    ]
});

//html files
UTIL.generateHtml(webpackDevConfig, PATHS.DIST.join('/pages/'));
module.exports = webpackDevConfig;