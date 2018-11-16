const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const webpackConfig = require('./webpack.dev.conf');
const conf = require('../package.json');

let compiler = webpack(webpackConfig);
const devServerOptions = {
    port: conf.port,
    proxy: conf.proxy,
    host: '0.0.0.0', // '0.0.0.0' 可以通过局域网访问
    overlay: true,
    stats: 'errors-only',
    compress: true,
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    open: true,
    publicPath: '/'
};

WebpackDevServer.addDevServerEntrypoints(webpackConfig, devServerOptions);

const server = new WebpackDevServer(compiler, devServerOptions);

server.listen(devServerOptions.port, devServerOptions.host, () => {
    console.log(`Starting server on http://${devServerOptions.host}:${devServerOptions.port}`);
});
