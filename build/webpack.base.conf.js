const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const HTMLPlugin = new HtmlWebPackPlugin({
    template: './app/web/index.html',
    filename: './index.html'
});

const devMode = process.env.NODE_ENV !== 'production';
const ssrMode = process.env.NODE_ENV === 'ssr';

// const getLessLoader = (modules) => {
//     let module = {
//         importLoaders: 3
//     };
//     if (modules) {
//         module.modules = true;
//         module.localIdentName = '[name]_[local]_[hash:base64:5]';
//     }

// }

const getLessLoader = (modules) => {
    let module = {
        importLoaders: 3
    };
    if (modules) {
        module.modules = true;
        module.localIdentName = '[name]_[local]_[hash:base64:5]';
    }
    let loaders = [
        {
            loader: 'css-loader',
            options: module
        },
        {
            loader: 'postcss-loader',
            options: {
                plugins: [require('autoprefixer')('last 100 versions')]
            }
        },
        {
            loader: 'resolve-url-loader'
        },
        {
            loader: 'less-loader',
            options: {
                javascriptEnabled: true,
                modifyVars: { '@primary-color': '#1DA57A' }
            }
        }
    ];

    if (ssrMode) {
        loaders.unshift('isomorphic-style-loader');
    } else {
        loaders.unshift(devMode ? 'style-loader' : MiniCssExtractPlugin.loader);
    }

    return loaders;
};

const plugins = ssrMode ? [] : [HTMLPlugin];

module.exports = {
    entry: {
        app: path.join(__dirname, '../app/web/entry-client.js')
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: { minimize: true }
                    }
                ]
            },
            {
                test: /\.less$/,
                exclude: [/app\/web/],
                use: getLessLoader(false)
            },
            {
                test: /\.less$/,
                exclude: [/node_modules/],
                use: getLessLoader(true)
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },
    plugins: plugins
};
