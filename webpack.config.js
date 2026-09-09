const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development', // or 'production'
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        port: 'auto',
    }
};