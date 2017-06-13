const path = require('path');

module.exports = {
    context: path.resolve(__dirname),
    devtool: "eval-source-map",
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: '[name].js',
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 3000,
        publicPath: '/js/'
    },
};