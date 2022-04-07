/**
 * @file webpack 基础配置
 * @author  lvmengmeng
 */
const path = require('path');
const markdownRender = require('markdown-it')();

const config = {
    // webpack4新增mode：根据环境变量区分development/production
    mode: process.env.NODE_ENV,
    // 项目入口
    entry: path.join(__dirname, '../examples/index.js'),
    // 项目打包
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, '../dist')
    },
    // 项目引用
    resolve: {
        // require时省略的扩展名
        extensions: ['.js', '.vue']
    },
    // 模块加载器 项目依赖loader配置
    module: {
        rules: [
            {
                test: /\.(vue|js|jsx)$/,
                loader: 'eslint-loader',
                exclude: [/node_modules/, /examples/],
                enforce: 'pre'
            },
            {
                test: /\.md$/,
                use: [
                    {
                        loader: 'vue-loader'
                    },
                    {
                        loader: 'vue-markdown-loader/lib/markdown-compiler',
                        options: {
                            raw: true,
                            preventExtract: true,
                            use: [
                                [
                                    require('markdown-it-container'),
                                    'demo', {

                                        validate: (params) => {
                                            return params.trim().match(/^demo\s+(.*)$/);
                                        },

                                        render: (tokens, idx) => {
                                            if (tokens[idx].nesting === 1) {
                                            // 1.获取第一行的内容使用markdown渲染html作为组件的描述
                                                const demoInfo = tokens[idx].info.trim().match(/^demo\s+(.*)$/);
                                                const description = (demoInfo && demoInfo.length > 1)
                                                    ? demoInfo[1] : '';
                                                const descriptionHTML = description
                                                    ? markdownRender.render(description) : '';
                                                // 2.获取代码块内的html和js代码
                                                const content = tokens[idx + 1].content;
                                                // 3.使用自定义开发组件【DemoBlock】来包裹内容并且渲染成案例和代码示例
                                                return `<demo-block>
                  <div class="source" slot="source">${content}</div>
                  ${descriptionHTML}
                  <div class="highlight" slot="highlight">`;
                                            } else {
                                                return '</div></demo-block>\n';
                                            }
                                        }
                                    }
                                ]]
                        }
                    }]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(eot|woff|woff2|ttf|otf)([\\?]?.*)$/,
                loader: 'file-loader'
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader?cacheDirectory',
                exclude: /node_modules/
            },
            {
                test: /\.(png|gif|jpg|jpeg|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: '[name].[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    }
};

module.exports = config;
