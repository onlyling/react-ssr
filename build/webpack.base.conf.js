const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const HTMLPlugin = new HtmlWebPackPlugin({
    template: './src/index.html',
    filename: './index.html'
});

module.exports = {
    entry: {
        app: path.join(__dirname, '../src/entry-client.js')
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: { minimize: true }
                    }
                ]
            },
            {
                test: /\.less$/,
                exclude: [/src/],
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')('last 100 versions')
                            ]
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true,
                            modifyVars: { '@primary-color': '#1DA57A' }
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName:
                                '[path][name]__[local]--[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')('last 100 versions')
                            ]
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            // javascriptEnabled: true,
                            // modifyVars: { '@primary-color': '#1DA57A' }
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },
    plugins: [HTMLPlugin]
};
