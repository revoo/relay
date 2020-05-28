const path = require('path');
const webpack = require('webpack');
require('dotenv').config();
// to use dotenv variables in client-side react code
// const Dotenv = require('dotenv-webpack');

// to avoid requiring webpack in multiple files, the webpack instance from server.js is passed into this module.
// for use with the DefinePlugin under plugins
module.exports = {
        // this is the default
        target: 'web',
        // from web: Your Webpack config needs to include the HMR client code as an entry point in addition to your actual application entry file. 
        // This adds a small piece to the client bundle, which will open a websocket connection back to the Webpack dev server.
        // entry: ['./src/index.js', "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000"],
        entry: './src/index.jsx',
        output: {
            filename: 'bundle.js',
            // for dev webpack server middleware for use with our own custom express server rather than webpack dev built in express server
            // from docs: The publicPath configuration option can be quite useful in a variety of scenarios. 
            // It allows you to specify the base path for all the assets within your application.
            publicPath: '/'
        },
        mode: 'development',
        // for automatic reloading and automatic code compliation
        /* 
           from webpack docs:
           webpack-dev-server doesn't write any output files after compiling. 
           Instead, it keeps bundle files in memory and serves them as if they were real files mounted at the server's root path. 
           If your page expects to find the bundle files on a different path, you can change this with the publicPath option in the dev server's configuration
        */
        devServer: {
            // which directory to serve files from
            publicPath: '/',
            // serves html files as well
            contentBase: '/public',
            watchContentBase: true,
            // webpack will write automatic builds to disk
            writeToDisk: true
        },
        // various development tools for webpack. Eval source map enables source maps so instead of getting an error from bundle.js
        // you'll get an error for the component directly responsible like sockets.js which after build gets bundled into bundle.js
        devtool: 'eval-source-map',
        plugins: [
            // no need for dotenv for react for now 
            // new Dotenv()
            // This will do a direct text replacement anywhere in the react code with the following replacement rules:
            new webpack.DefinePlugin({
                // Note that because the plugin does a direct text replacement, 
                // the value given to it must include actual quotes inside of the string itself. 
                // Typically, this is done either with either alternate quotes, such as '"production"', or by using JSON.stringify('production'). 
                WEBPACK_WILL_INJECT_HOSTNAME: JSON.stringify(process.env.LOCALHOST),
                'process.env.NODE_ENV': JSON.stringify('localhost')
            })
        ],
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    resolve: { extensions: [".js", ".jsx"] },
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
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [
                        'file-loader',
                    ],
                },
            ]
        }
    }