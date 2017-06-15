const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const entries = [
    'react-hot-loader/patch',
    // activate HMR for React

    './src/index.js',
    // the entry point of our app
]

let plugins = [
    new webpack.HotModuleReplacementPlugin(), // Enable HMR
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor' // Specify the common bundle's name.
    }),
    new ExtractTextPlugin('../css/styles.css')
]

if (process.env.REPORT) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'static'
    }))
}

module.exports = {
    context: path.resolve(__dirname),
    devtool: "eval-source-map",
    entry: {
        main: entries,
        vendor: ['onsenui', 'react', 'react-dom', 'react-onsenui']
    },
    output: {
        path: path.resolve(__dirname, 'platforms/android/assets/www/js'),
        filename: '[name].js',
        publicPath: "/js/"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/],
                use: ['babel-loader'],
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader']
                })
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader?name=../assets/[name].[ext]'
            }
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, "platforms/android/assets/www"),
        hot: true, // Tell the dev-server we're using HMR,
        compress: true,
        port: 3000,
        publicPath: "/js/",
        disableHostCheck: true,
    },
    plugins: plugins
};