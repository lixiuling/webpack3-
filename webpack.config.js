const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
let autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
    entry: {
        demo1: path.resolve(__dirname, 'src/demo1/index.js'),
        vendor: [
            'lodash'
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist/demo1'),
        hot: false,
        port: 3000,
    },
    plugins: [
        new CleanWebpackPlugin(['dist/demo1']),
        // new webpack.ProvidePlugin({
        //     _: 'lodash'
        // }),
        new UglifyJsPlugin(),
        new HtmlWebpackPlugin({
            title: 'Code Splitting'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),
        new ExtractTextPlugin('[name].css'),
        new webpack.NamedModulesPlugin(),
        //new webpack.HashedModuleIdsPlugin(),//用于生产环境

        // 如果是开发环境，将配置文件中的chunkhash 替换为hash，如果是生产环境，不要使用参数 --hot
        //new webpack.HotModuleReplacementPlugin()
    ],
    output: {
        path: path.resolve(__dirname, 'dist/demo1'),
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'less-loader', 'postcss-loader'],
                //publicPath:'../' //解决css背景图的路径问题
            })
        },{
            test: /\.(png|svg|jpg|gif|jpeg)$/,
            use: ['file-loader']
        },{
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: ['file-loader']
        },{
            test: /\.(csv|tsv)$/,
            use: ['csv-loader']
        },{
            test: /\.xml$/,
            use: ['xml-loader']
        }]
    }
};
