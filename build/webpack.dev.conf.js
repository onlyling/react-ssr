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
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
});
