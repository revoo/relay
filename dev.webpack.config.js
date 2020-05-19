const path = require('path');
const webpack = require('webpack');
require('dotenv').config();
// to use dotenv variables in client-side react code
// const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js'
    },
    mode: 'development',
    // various development tools for webpack. Inline source map enables source maps so instead of getting an error from bundle.js
    // you'll get an error for the component directly responsible like sockets.js which after build gets bundled into bundle.js
    devtool: 'inline-source-map',
    plugins: [
        // no need for dotenv for react for now 
        // new Dotenv()
        // This will do a direct text replacement anywhere in the react code with the following replacement rules:
        new webpack.DefinePlugin({
            // Note that because the plugin does a direct text replacement, 
            // the value given to it must include actual quotes inside of the string itself. 
            // Typically, this is done either with either alternate quotes, such as '"production"', or by using JSON.stringify('production'). 
            WEBPACK_WILL_INJECT_HOSTNAME: JSON.stringify(process.env.LOCALHOST),
        })
    ],
    module: {
        rules: [
            {
                test: /\.js/,
                include: [path.resolve(__dirname, 'src')],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ]
            }
        ]
    }
}