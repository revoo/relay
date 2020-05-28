const path = require('path');
const webpack = require('webpack');
require('dotenv').config();
// to use dotenv variables in client-side react code
// const Dotenv = require('dotenv-webpack');

// from webpack docs (https://webpack.js.org/guides/production/): 
// With this logical separation at hand, we typically recommend writing separate webpack configurations for each environment.


module.exports = {
    entry: './src/index.jsx',
    output: {
        filename: 'bundle.js'
    },
    mode: 'development',
    plugins: [
        // no need for dotenv for react for now 
        // new Dotenv()
        // This will do a direct text replacement anywhere in the react code with the following replacement rules:
        new webpack.DefinePlugin({
            WEBPACK_WILL_INJECT_HOSTNAME: process.env.PRODHOST
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