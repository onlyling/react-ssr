/**
 * Babel jsx 配置
 */
module.exports = (isDev) => {
    let config = {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader?cacheDirectory',
            options: {
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            modules: false,
                            useBuiltIns: 'entry',
                            targets: {
                                browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']
                            }
                        }
                    ],
                    '@babel/preset-react'
                ],
                plugins: [
                    [
                        'import',
                        {
                            libraryName: 'antd',
                            libraryDirectory: 'es',
                            style: true
                        }
                    ],
                    ['lodash'],
                    ['@babel/plugin-syntax-dynamic-import'],
                    [
                        '@babel/plugin-proposal-decorators',
                        {
                            legacy: true
                        }
                    ],
                    ['@babel/plugin-proposal-class-properties', { loose: true }],
                    '@babel/plugin-proposal-function-sent',
                    '@babel/plugin-proposal-export-namespace-from',
                    [
                        '@babel/plugin-transform-runtime',
                        {
                            corejs: 2,
                            helpers: false,
                            useESModules: false,
                            regenerator: true
                        }
                    ],
                    isDev ? 'react-hot-loader/babel' : 'react-loadable/babel'
                ]
            }
        }
    };

    return config;
};
