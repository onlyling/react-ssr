const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const ReactLoadablePlugin = require('react-loadable/webpack')
    .ReactLoadablePlugin;
// const nodeExternals = require('webpack-node-externals');
const ora = require('ora');

const spinner = ora('building for SSR...');
spinner.start();

const SSRDir = (p = '') => {
    return path.join(__dirname, `../ssr${p}`);
};

webpack(
    merge(baseWebpackConfig, {
        mode: 'production',
        entry: {
            app: path.join(__dirname, '../src/entry-server.js')
        },
        output: {
            path: SSRDir(),
            publicPath: '/public',
            filename: 'ssr.js',
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
            new ReactLoadablePlugin({
                filename: SSRDir('/react-loadable.json')
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
