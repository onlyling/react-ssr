const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ora = require('ora');

const baseWebpackConfig = require('./webpack.base.conf');

const spinner = ora('building for SSR...\n');

spinner.start();

const Dir = (p = '') => {
    return path.join(__dirname, `../app/ssr${p}`);
};

webpack(
    merge(baseWebpackConfig, {
        mode: 'production',
        entry: {
            app: path.join(__dirname, '../app/web/entry-server.js')
        },
        output: {
            path: Dir(),
            publicPath: '/public',
            filename: 'ssr.js',
            // chunkFilename: '[name].js',
            libraryExport: 'default',
            libraryTarget: 'commonjs2'
        },
        target: 'node',
        plugins: [
            new CleanWebpackPlugin(['./*.js'], {
                root: Dir(),
                verbose: true
            })
        ]
    }),
    (err, stats) => {
        spinner.stop();

        if (err) throw err;

        process.stdout.write(
            stats.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false
            }) + '\n\n'
        );
    }
);
