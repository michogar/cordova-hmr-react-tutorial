const path = require('path');

module.exports = {
    context: path.resolve(__dirname),
    devtool: "eval-source-map",
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    }
};