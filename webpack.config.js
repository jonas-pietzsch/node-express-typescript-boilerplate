const merge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')
const IsomorphicLoaderPlugin = require('isomorphic-loader/lib/webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CheckerPlugin } = require('awesome-typescript-loader')

const devMode = process.env.NODE_ENV !== 'production'

const PATHS = {
    frontend: path.join(__dirname, 'service', 'frontend'),
    shared: path.join(__dirname, 'service', 'shared'),
    build: path.join(__dirname, 'service', 'www')
}

console.error('Running webpack in', devMode ? 'development' : 'production', 'mode')

const common = {
    mode: devMode ? 'development' : 'production',
    entry: {
        app: [
            'core-js',
            path.join(PATHS.frontend, 'index.ts')
        ]
    },
    output: {
        path: PATHS.build,
        publicPath: '/',
        filename: 'static/[name]-bundle.js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.(tsx?|jsx?)$/,
                use: [{
                    loader: 'awesome-typescript-loader',
                        options: {
                            silent: !devMode,
                            configFileName: 'tsconfig-frontend.json'
                        }
                }],
                include: [
                    PATHS.frontend,
                    PATHS.shared
                ]
            },
            {
                test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|mp4|svg|ttf|woff|woff2)(\?.*)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: devMode ? 'static/media/[name].[ext]' : 'static/media/[name].[hash:8].[ext]',
                        publicPath: '/'
                    }
                }, {
                    loader: 'isomorphic-loader'
                }]
            },
            {
                test: /\.jsx?$/,
                loader: 'source-map-loader',
                enforce: 'pre',
                include: [
                    PATHS.frontend,
                    PATHS.shared
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                VERSION: JSON.stringify(require('./package.json').version),
                NODE_ENV: JSON.stringify(devMode ? 'development' : 'production'),
                APP_ENV: JSON.stringify('browser')
            },
            __DEV__: devMode
        }),
        new IsomorphicLoaderPlugin({
            assetsFile: 'static/media/isomorphic-assets.json',
            keepExistingConfig: !devMode
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? 'static/media/[name].css' : 'static/media/[name].[contenthash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
        }),
        new CheckerPlugin()
    ]
}

if (devMode) {
    module.exports = merge(common, {
        entry: {
            app: [
                'webpack-hot-middleware/client?reload=true'
            ]
        },
        output: {
            hotUpdateChunkFilename: 'hot/hot-update.js',
            hotUpdateMainFilename: 'hot/hot-update.json'
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    })
} else {
    // config can be added here for minifying / etc
    module.exports = merge(common, {})
}
