const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const opn = require('opn');
const baseConfig = require('./webpack.base.config');
var DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");

const { PATHS,PORTS } = require('./commonConfig');
const devConfig = merge(baseConfig, {
	mode: 'development',
	output:{
        publicPath: 'http://localhost:'+PORTS.BROWSER_SYNC+'/views/'
    },
	plugins: [
		new DuplicatePackageCheckerPlugin(), 
		new webpack.DefinePlugin({
			'process.env': {
			  'NODE_ENV': '"development"'
			}
		  }),
		 //开启HMR(热替换功能,替换更新部分,不重载页面！)
		new webpack.HotModuleReplacementPlugin(),
   		new HtmlWebpackPlugin({
			inject: 'body',
			title: 'webpack 学习历程',
			template: './src/views/index.html',
			filename: 'index.html'
		})
	],	
	/*设置api转发*/
	devServer: {
		contentBase: PATHS.DIST,
		port: PORTS.BROWSER_SYNC,
		host: '0.0.0.0',
		noInfo: true,
		hot: true,
		inline: true,
		compress: false,
		proxy: {
			'/': {
			 bypass: function (req, res, proxyOptions) {
				console.log('Skipping proxy for browser request.')
				return 'http://localhost:'+PORTS.BROWSER_SYNC+'/views/index.html'
				}
			}
		},
		historyApiFallback: true,
        disableHostCheck: true,
		/*打开浏览器 并打开本项目网址*/
        after() {
		 	opn('http://localhost:'+PORTS.BROWSER_SYNC+'/views/',{app: ['google chrome', '--incognito']})
        }
	}
})
module.exports = devConfig;
