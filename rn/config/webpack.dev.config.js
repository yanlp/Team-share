const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base.config');

const {PATHS, PORTS} = require('./commonConfig');
const devConfig = merge(baseConfig, {
	mode: 'development',
	devtool: '#eval-source-map',
	// output: {
	// 	publicPath: `http://localhost:${PORTS.BROWSER_SYNC}/`,
	// },
	optimization: {
	    runtimeChunk: {
	        name: "manifest"
	    },
	    splitChunks: {
	        cacheGroups: {
	            commons: {
	                test: /[\\/]node_modules[\\/]/,
	                name: "vendor",
	                chunks: "all"
	            }
	        }
	    }
	},
	plugins: [
    new HtmlWebpackPlugin({
			inject: 'body',
			title: 'webpack 学习历程',
			template: './src/index.html',
			filename: 'index.html'
		})
  ],
	devServer: {
			contentBase: path.resolve(__dirname, '/../dist/'),
			port: PORTS.BROWSER_SYNC,
	    noInfo: true,
	    hot: true,
	    inline: true,
	    compress: false,
	}
})
module.exports = devConfig;
