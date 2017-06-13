const path = require('path');
const webpack = require('webpack');

const entries = [
    'react-hot-loader/patch',
    // activate HMR for React

    './src/index.js',
    // the entry point of our app
]

module.exports = {
    context: path.resolve(__dirname),
    devtool: "eval-source-map",
    entry: {
        main: entries
    },
    output: {
        path: path.resolve(__dirname, 'dist/js'),
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
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader?name=assets/[name].[ext]'
            }
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        hot: true, // Tell the dev-server we're using HMR,
        compress: true,
        port: 3000,
        publicPath: "/js/"
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // Enable HMR
        new webpack.NamedModulesPlugin(),
    ],
};