const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const jsxConfig = require('./jsx.config');

const HTMLPlugin = new HtmlWebPackPlugin({
    template: './app/web/index.html',
    filename: './index.html'
});
const resolve = (dir) => {
    return path.join(__dirname, '../app/web', dir);
};

const devMode = process.env.NODE_ENV !== 'production';
const ssrMode = process.env.NODE_ENV_SSR === 'SSR';

/**
 * Less 样式转换
 * @param {Boolean} isCSSModules 是否使用 CSS Modules
 */
const getLessLoader = (isCSSModules) => {
    let module = {
        importLoaders: 2
    };
    if (isCSSModules) {
        module.modules = true;
        module.localIdentName = '[name]_[local]_[hash:base64:5]';
    }
    let loaders = [
        {
            loader: 'css-loader',
            options: module
        },
        {
            loader: 'postcss-loader',
            options: {
                plugins: [require('autoprefixer')('last 100 versions')]
            }
        },
        {
            loader: 'less-loader',
            options: {
                javascriptEnabled: true,
                modifyVars: { '@primary-color': '#1DA57A' }
            }
        }
    ];

    if (ssrMode) {
        loaders.unshift('isomorphic-style-loader');
    } else {
        loaders.unshift(devMode ? 'style-loader' : MiniCssExtractPlugin.loader);
    }

    return loaders;
};

const plugins = ssrMode ? [] : [HTMLPlugin];

module.exports = {
    entry: {
        app: path.join(__dirname, '../app/web/entry-client.js')
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@Utils': resolve('utils.js'),
            '@components': resolve('components'),
            '@layouts': resolve('layouts')
        }
    },
    module: {
        rules: [
            jsxConfig(devMode),
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
                exclude: [/app\/web/],
                use: getLessLoader(false)
            },
            {
                test: /\.less$/,
                exclude: [/node_modules/],
                use: getLessLoader(true)
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
    plugins: plugins
};
