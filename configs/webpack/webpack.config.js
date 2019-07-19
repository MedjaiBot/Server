const path = require('path');
const cleanTerminalPlugin = require('clean-terminal-webpack-plugin');

module.exports = {
    mode: 'development',
    target: 'node',
    devtool: 'source-map',
    entry: {
        main: path.resolve(__dirname, '..', '..', 'src', 'index.ts')
    },
    output: {
        path: path.resolve(__dirname, '..', '..', 'dist'),
        filename: '[name].js'
    },
    module: {
        noParse: /\/native-require.js$/,
        exprContextCritical: false,
        rules: [
            {
                test: /.tsx?$/,
                use: [
                    'imports-loader',
                    'ts-loader'
                ],
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [
            '.js',
            '.ts',
            '.json'
        ],
    },
    plugins: [
        new cleanTerminalPlugin(),
    ]
};