/**
 * @file webpack 开发/生产环境配置
 * @author  lvmengmeng
 */
const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// html处理
const HtmlWebpackPlugin = require('html-webpack-plugin');
// css分离
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 清除文件
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
// 合并配置
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');
const defaultPlugins = [
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../index.html')
    }),
    new VueLoaderPlugin()
];
// devServer提供服务，方便热更新
const devServer = {
    port: 8000,
    host: 'localhost',
    overlay: {
        errors: true
    }
};

// 不同环境区分配置,通过webpack-merge进行对象拼接
let config;

if (isDev) {
    config = merge(baseConfig, {
        mode: 'development',
        devtool: '#cheap-module-eval-source-map',
        module: {
            rules: [
                {
                    test: /\.styl(us)?/,
                    use: [
                        'vue-style-loader',
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        'stylus-loader'
                    ]
                }
            ]
        },
        devServer,
        plugins: defaultPlugins
    });
} else {
    config = merge(baseConfig, {
        mode: 'production',
        entry: {
            app: path.join(__dirname, '../examples/index.js'),
            vendor: ['vue']
        },
        output: {
            filename: '[name].[chunkhash:8].js'
        },
        optimization: {
            // 默认打包node_modules到vendor.js
            splitChunks: {
                chunks: 'all'
            },
            // 将webpack运行时生成代码打包
            runtimeChunk: {
                name: 'manifest'
            }
        },
        module: {
            rules: [
                {
                    test: /\.styl(us)?/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        'stylus-loader'
                    ]
                }
            ]
        },
        plugins: defaultPlugins.concat([
            // 分离css
            new MiniCssExtractPlugin({
                filename: 'styles.[contentHash:8].css'
            }),
            // 实现持久化缓存
            new webpack.HashedModuleIdsPlugin(),
            // 清除dist
            new CleanWebpackPlugin()
        ])
    });
}

module.exports = config;
