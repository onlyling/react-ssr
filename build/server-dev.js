const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const webpackConfig = require('./webpack.dev.conf');

let compiler = webpack(webpackConfig);
const devServerOptions = Object.assign({}, webpackConfig.devServer, {
    stats: {
        colors: true
    }
});

const server = new WebpackDevServer(compiler, devServerOptions);

server.listen(9091, '127.0.0.1', () => {
    console.log('Starting server on http://localhost:9091');
});
