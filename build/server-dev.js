const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const webpackConfig = require('./webpack.dev.conf');

let compiler = webpack(webpackConfig);
const devServerOptions = {
    port: 9091,
    host: '127.0.0.1',
    overlay: true,
    stats: 'errors-only',
    compress: true,
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    open: true
};

WebpackDevServer.addDevServerEntrypoints(webpackConfig, devServerOptions);

const server = new WebpackDevServer(compiler, devServerOptions);

server.listen(devServerOptions.port, devServerOptions.host, () => {
    console.log(
        `Starting server on http://${devServerOptions.host}:${
            devServerOptions.port
        }`
    );
});
