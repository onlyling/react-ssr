const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const conf = require('../package.json');

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    entry: {
        app: [
            'react-hot-loader/patch',
            `webpack-dev-server/client?http://localhost:${conf.port}`,
            'webpack/hot/only-dev-server',
            path.join(__dirname, '../src/entry-client.js')
        ]
    },
    output: {
        publicPath: '/',
        filename: 'static/js/bundle.js',
        chunkFilename: 'static/js/[name].chunk.js'
    },
    devtool: '#cheap-module-eval-source-map',
    module: {
        rules: [{
            test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'env', 'stage-2'],
                        plugins: [
                            [
                                'import',
                                {
                                    libraryName: 'antd',
                                    style: true
                                }
                            ],
                            ['transform-decorators-legacy'],
                            ['syntax-dynamic-import'],
                            [
                                'transform-runtime',
                                {
                                    helpers: false,
                                    polyfill: false,
                                    regenerator: true,
                                    moduleName: 'babel-runtime'
                                }
                            ],
                            'react-hot-loader/babel'
                        ]
                    }
                }
        }]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
});
