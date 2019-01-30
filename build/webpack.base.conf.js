const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const jsxConfig = require('./jsx.config');
const { shouldUseRelativeAssetPaths, resolveSrcPath } = require('./config');

const HTMLPlugin = new HtmlWebPackPlugin({
    template: resolveSrcPath('index.html'),
    filename: './index.html'
});

const devMode = process.env.NODE_ENV !== 'production';
const ssrMode = process.env.NODE_ENV_SSR === 'SSR';

const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

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
        loaders.unshift(
            devMode
                ? 'style-loader'
                : {
                      loader: MiniCssExtractPlugin.loader,
                      options: shouldUseRelativeAssetPaths ? { publicPath: '../../' } : undefined
                  }
        );
    }

    return loaders;
};

const plugins = ssrMode ? [] : [HTMLPlugin];

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@Utils': resolveSrcPath('utils.js'),
            '@components': resolveSrcPath('components'),
            '@layouts': resolveSrcPath('layouts')
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
                test: lessRegex,
                exclude: lessModuleRegex,
                use: getLessLoader(false)
            },
            {
                test: lessModuleRegex,
                exclude: /[\\/]node_modules[\\/]/,
                use: getLessLoader(true)
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'static/media/[name].[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: plugins
};
