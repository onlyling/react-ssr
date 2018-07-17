const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    output: {
        filename: 'static/js/bundle.js',
        chunkFilename: 'static/js/[name].chunk.js'
    },
    devtool: '#cheap-module-eval-source-map',
    // plugins: [],
    devServer: {
        // content: [__dirname],
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        // port: 9091
    }
});
