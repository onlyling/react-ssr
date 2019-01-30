const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ora = require('ora');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const { publicPath: defaultPublicPath, resolveRootPath, resolveSrcPath } = require('./config');

const baseWebpackConfig = require('./webpack.base.conf');

const publicPath = defaultPublicPath || '/public/static/';
const appBuild = resolveRootPath('app/public/static');

const spinner = ora('building for production...\n');
spinner.start();

const Dir = (p = '') => {
    return path.join(__dirname, `../app/public/static${p}`);
};

webpack(
    merge(baseWebpackConfig, {
        mode: 'production',
        entry: {
            app: resolveSrcPath('entry-client.js')
        },
        output: {
            path: appBuild,
            publicPath: publicPath,
            filename: 'js/[name].[chunkhash:8].js',
            chunkFilename: 'js/[name].[chunkhash:8].js'
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    // styles: {
                    //     test: /\.(css|less)$/,
                    //     name: 'styles',
                    //     chunks: 'all',
                    //     enforce: true
                    // },
                    // commons: {
                    //     test: /[\\/]node_modules[\\/]/,
                    //     name: 'vendors',
                    //     chunks: 'all'
                    // }
                    commons: {
                        name: 'commons',
                        chunks: 'initial',
                        minChunks: 2,
                        maxInitialRequests: 5,
                        minSize: 0
                    },
                    vendor: {
                        test: /node_modules/,
                        chunks: 'initial',
                        name: 'vendor',
                        priority: 10,
                        enforce: true
                    },
                    baseLib: {
                        test: /node_modules\/(\@rematch|axios)/,
                        chunks: 'initial',
                        name: 'base-lib',
                        priority: 15,
                        enforce: true
                    },
                    reactLib: {
                        test: /node_modules\/(react|redux)/,
                        chunks: 'initial',
                        name: 'react-lib',
                        priority: 20,
                        enforce: true
                    }
                }
            },
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    uglifyOptions: {
                        output: {
                            comments: false
                        }
                    }
                    // sourceMap: true // set to true if you want JS source maps
                }),
                new OptimizeCSSAssetsPlugin({})
            ]
        },
        plugins: [
            new CleanWebpackPlugin(['js', 'css'], {
                root: appBuild,
                verbose: true
            }),
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css'
            }),
            new ReactLoadablePlugin({
                filename: resolveRootPath('app/public/static/react-loadable.json')
            }),
            new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
            new webpack.optimize.ModuleConcatenationPlugin(),
            new BundleAnalyzerPlugin()
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
