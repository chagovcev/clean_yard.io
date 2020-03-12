const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
        publicPath: '/dist'
    },
    devServer: {
        overlay: true
    },
    module: {
        rules: {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node_modeles/'
        }
    }
};