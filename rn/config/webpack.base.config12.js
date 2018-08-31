const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 			HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

/*const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { dependencies } = require('../package');
const {PATHS} = require('./commonConfig');*/
const fontsOptions = {
	limit: 8192,
  mimetype: 'application/font-woff',
  name: 'fonts/[name].[ext]'
}
module.exports = {
	entry: {
		vendor: ['react', 'react-dom'],
		index: './src/index.js'
	},
	module: {
		rules: [{
			test: /\.js[x]?$/,
			exclude: /node_modules/,
			use: {
		    loader: 'babel-loader',
		    options: {
		      presets: ['@babel/preset-react'],
		      plugins: ['@babel/plugin-proposal-class-properties'],
		    }
		  }
		}, {
			test: /\.html$/,
			use: {
				loader:  'html-loader',
				options: {
					// name: 'html/[name].html'
				}
			}
		},{
			test: /\.(png|jpg|gif)$/,
			use: {
				loader: 'file-loader',
				options: fontsOptions
			}
		}, {
				test: /\.scss|css$/,
				use: [{loader: 'style-loader'}, {loader: 'css-loader'}, {loader: 'postcss-loader'},{loader: 'sass-loader?source-map'}]
			}, {
				test:/\.(woff|svg|eot|ttf)\??.*$/,  
        use: [{  
                loader: "file-loader",  
                options: {  
                    limit:50000,   //小于50K的 都打包  
                    name:"fonts/[hash:8].[name].[ext]",  
                    // publicPath:"img/",  //替换CSS引用的图片路径 可以替换成爱拍云上的路径  
                    // outputPath:"../img/"        //生成之后存放的路径  
         		}  
         }  
        ]
			}]
	}
}