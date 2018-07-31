const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ReactLoadablePlugin = require('react-loadable/webpack')
    .ReactLoadablePlugin;
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
            filename: '[name].js',
            chunkFilename: '[name].js',
            libraryExport: 'default',
            libraryTarget: 'commonjs2'
        },
        target: 'node',
        //避免把node_modules里的库都打包进去，此ssr js会直接运行在node端，
        //所以不需要打包进最终的文件中，运行时会自动从node_modules里加载
        // externals: [nodeExternals()],
        module: {
            rules: [
                {
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
                                ['react-loadable/babel'],
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
                                ]
                            ]
                        }
                    }
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(['./*.js'], {
                root: Dir(),
                verbose: true
            }),
            new ReactLoadablePlugin({
                filename: Dir('/react-loadable.json')
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
