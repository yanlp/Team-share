const path = require('path');
const {join, resolve} = path;
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
// const HtmlWebpackPlugin  = require("html-webpack-plugin");
const clearOptions = {
    root: resolve(__dirname, '../')
}
const pathToClean = [
    'dist'
]
const pluginExtra = new ExtractTextWebpackPlugin({
    filename: 'css/[name].css',
    // ignoreOrder: true
})
const base = {
    entry: {
        index: './src/views/index.js'
    },
    output: {
        filename: 'js/[name].js',
        path: resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                include: [
                    resolve(__dirname, '../src')
                ],
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react'],
                    plugins: ['@babel/plugin-proposal-class-properties']
                }
            }, {
                test: /\.(css|scss)$/,
                // use: [ {
                //     loader: 'style-loader'
                // }, {
                //     loader: 'css-loader'
                // }, {
                //     loader: 'postcss-loader'
                // }, {
                //     loader: 'sass-loader'
                // }]
                // {
                //     fallback:'style-loader',
                //     use: [
                //         {
                //             loader: 'css-loader',
                //             options: {
                //                 modules: true
                //             }
                //         },
                //         {
                //             loader: 'postCss-loader',
                            
                //         }, {
                //             loader: 'sass-loader'
                //         }
                //     ]
                // }
                use: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postCss-loader', 'sass-loader']
                })
            },{
                test: /\.(jpg|png|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 8192 ,// 8k以下转义为base64
                            name: 'img/[name].[ext]?[hash]'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: [ '.js', '.jsx'],
        alias: {
            ROOT: path.resolve(__dirname, '../'),
            Images: resolve(__dirname, '../src/views/assets/img'),
            CSS: resolve(__dirname, '../src/views/assets/css')
        }
    },
};

module.exports = base;
// export default base;