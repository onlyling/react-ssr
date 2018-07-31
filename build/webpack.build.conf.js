const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ora = require('ora');
// const WebpackAssetsManifest = require('webpack-assets-manifest');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { ReactLoadablePlugin } = require('react-loadable/webpack');

const baseWebpackConfig = require('./webpack.base.conf');

const spinner = ora('building for production...\n');
spinner.start();

const Dir = (p = '') => {
    return path.join(__dirname, `../app/public/static${p}`);
};

webpack(
    merge(baseWebpackConfig, {
        mode: 'production',
        entry: {
            app: path.join(__dirname, '../app/web/entry-client.js')
        },
        output: {
            path: Dir(),
            publicPath: '/public/static/',
            filename: 'js/[name].[hash].js',
            chunkFilename: 'js/[name].[chunkhash].js'
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                'react',
                                [
                                    'env',
                                    {
                                        modules: false,
                                        useBuiltIns: true,
                                        targets: {
                                            browsers: [
                                                '> 1%',
                                                'last 2 versions',
                                                'Firefox ESR'
                                            ]
                                        }
                                    }
                                ],
                                'stage-2'
                            ],
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
        optimization: {
            splitChunks: {
                cacheGroups: {
                    styles: {
                        test: /\.(css|less)$/,
                        name: 'styles',
                        chunks: 'all',
                        enforce: true
                    },
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            },
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true
                    // sourceMap: true // set to true if you want JS source maps
                }),
                new OptimizeCSSAssetsPlugin({})
            ]
        },
        plugins: [
            new CleanWebpackPlugin(['js', 'css'], {
                root: Dir(),
                verbose: true
            }),
            new MiniCssExtractPlugin({
                filename: 'css/app.[hash].css'
            }),
            // new WebpackAssetsManifest(),
            new ReactLoadablePlugin({
                filename: Dir('/react-loadable.json')
            }),
            new webpack.optimize.ModuleConcatenationPlugin()
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
