const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { PATHS,PORTS } = require('./commonConfig');
module.exports = {
    entry:{
        app: path.join(__dirname,"../src/views/app.js"),
        vendors:['react', 'react-dom']
    },
    output:{
        path:PATHS.DIST,
        filename:"js/[name].js",
    },
    resolve:{
        extensions:['.js','.jsx','.json','.css','.less','sass','scss'],
        alias:{
            
        },
    },
    performance: {
        hints: false
    },
    module:{
        rules:[
            {
                test: /\.(js|jsx)?$/,
                exclude:/node_modules/,
                loader:'babel-loader',
                include: [
                    path.resolve(__dirname, "../src")
                ],
            },{

            }
        ]
    }
}
