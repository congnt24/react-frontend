let webpack_base_config = require("./webpack.base.config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
let path = require('path');
let webpack = require('webpack');
const reStyle = /\.(css|less|styl|scss|sass|sss)$/;

let HtmlWebpackPlugin = require('html-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const assetsPluginInstance = new AssetsPlugin({
    filename: 'build/assets.json',
    prettyPrint: true,
    metadata: {author: 'kongnt89'},
    manifestFirst: true,
});
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const CompressionPlugin = require("compression-webpack-plugin");
import { ReactLoadablePlugin } from 'react-loadable/webpack';



let plugins = process.env.NODE_ENV !== 'production' ? [
    new BundleAnalyzerPlugin(),
    // Sử dụng để hot reload resource
    new webpack.HotModuleReplacementPlugin(),
] : [];

let client = process.env.NODE_ENV !== 'production'
    ? ['webpack-hot-middleware/client?reload=true', 'react-hot-loader/patch', '@babel/polyfill', './src/client/index.js']
    : ['@babel/polyfill', './src/client/index.js'];

module.exports = {
    ...webpack_base_config,
    //development or production: production webpack sẽ auto optimize
    //'react-hot-loader/patch': sử dụng để hot loader
    entry: {
        client: client,
        // vendors: ['react', 'react-dom', 'react-router-dom', 'lodash', 'moment']
    },
    output: {
        //chunk js thành các file nhỏ, có thể thay hash = file_name để ko bị thay đổi mỗi khi build lại
        path: path.resolve('./build'),
        filename: 'client.js',
        chunkFilename: '[name].chunk.js',
        publicPath: "/"
    },
    plugins: [
        ...webpack_base_config.plugins,
        ...plugins,
        new ReactLoadablePlugin({
            filename: './build/react-loadable.json',
        }),
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin(['build'], {
            root: process.cwd()
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),

        assetsPluginInstance,
        //Sử dụng html template. trang index sẽ được load từ đây, sau đó react sẽ getElementById('root') và chèn AppComponent vào root
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            favicon: 'public/favicon.ico',
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        // new CompressionPlugin({
        //     filename: '[path].gz[query]',
        //     algorithm: 'gzip',
        //     test: /\.js(\?.*)?$/i,
        //     threshold: 10240,
        //     minRatio: 0.8
        // })
    ],
    module: {
        rules: [
            ...webpack_base_config.module.rules,
            {// Khi gặp các file có extension là css -> sử dụng css-loader và style-loader để compile
                test: reStyle,
                // include: paths.appSrc,
                exclude: /node_module/,
                use: [
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)$/,
                use: [{
                    loader: 'file-loader'
                }]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader'
                }]
            }
        ]
    },
    optimization: {
        runtimeChunk: false,
        splitChunks: {
            chunks: "async",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    // test: /react|react-dom/,
                    priority: -10,
                    chunks: 'initial',
                    name: 'vendor',
                    enforce: true
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        },
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            })
        ]
    },
    // Sử dụng dev Server: hot = true -> sử dụng hot reload
    devServer: {
        host: 'localhost',
        port: 3000,
        historyApiFallback: true,
        open: true,
        hot: true
    }
};