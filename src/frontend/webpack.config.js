const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevServer = process.argv[1].indexOf('webpack-dev-server') !== -1;

module.exports = {
    entry: './js/index.js',

    output: {
        filename: 'js/script.js',
        path: path.resolve(__dirname, '../public')
    },

    devtool: 'source-map',

    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },

    module: {
        rules: [{
            test: /\.css$/,
            use: [
                isDevServer ? 'style-loader' : MiniCssExtractPlugin.loader,
                'css-loader'
            ]
        }, {
            test: /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)$/,
            use: 'file-loader?name=[path][name].[ext]?[hash]'
        }, {
            test: /\.scss$/,
            use: [
                isDevServer ? 'style-loader' : MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader'
            ]
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }, {
                test: /\.vue$/,
                use: 'vue-loader'
        }]
    },

    plugins: [
        new CleanWebpackPlugin(),

        new MiniCssExtractPlugin({
            filename: 'css/style.css'
        }),

        new VueLoaderPlugin(),

        /*new HtmlWebpackPlugin({
            template: 'index.html'
        })*/
    ],

    devServer: {
        proxy: {
            '/': 'http://localhost:3000'
        }
    }
};