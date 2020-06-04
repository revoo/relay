const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
// load in env config
require('dotenv').config();

// PaaS service like Heroku will assign us a port, if running locally use hardcoded port.
const PORT = process.env.PORT || 3000;
// Determine local or production (Heroku)
const env = process.env.NODE_ENV || 'development';
// instead of using the standard webpack dev server that has an express server built in and supports
// hot module reloading (HMR) out of the box, we will use use a common component called webpack server middleware
// under the hood, the standard webpack server uses this component as well. But I don't want two different express servers
// one running backend services and one serving static assets like JS and css. I just want one so I will integrate it with this server in dev.
// HMR disabled.
if (env === 'localhost') {
    // env variable is set using npm script with the cross-env npm package.
    console.log('-- APP: Node running in localhost.');
    console.log('-- APP: Enabling localhost debug logging.');
    // 1. webpack set up
    const webpack = require('webpack');
    // to avoid requiring webpack in multiple files, the webpack instance from server.js is passed into this module.
    // for use with the DefinePlugin under plugins  
    // later note: node caches the require module result so you don't have to worry about multiple requires 
    const config = require('./local.webpack.config');
    const complier = webpack(config);
    // automatic compliation
    const webpackDevMiddleware = require('webpack-dev-middleware');
    // hot module replacement
    // const webpackHotMiddleware = require('webpack-hot-middleware');
    // 2. automatic webpack compliation (building) upon src changes
    // tell our express server to use the webpack middleware 
    // for automatic webpack compliation of static assets (react, css, fonts, etc) upon changes.
    // you still have to reload the page to see your changes. To see the changes without reloading we need hot module reloading.
    app.use(webpackDevMiddleware(complier, {
        hot: true,
        filename: 'bundle.js',
        publicPath: config.output.publicPath
    }));
    // 3. hot module replacement (HMR) so static asset (react) changes are visible instantly
    // HMR can be used in both dev or in prod for different reasons. 
    // in dev for obvious time-saving productivity reasons so you can see changes instantly without reloading and losing app state on reload
    // in prod as an update mechanism - for this you will need custom code to integrate with HMR
    // to make this work, webpack installs an HMR runtime into your dist bundle which increases its size but allows the hot swap functionality.
    // there is the HMR runtime which runs on the browser and it recieves module updates and the HMR server runs on your server and pushes updates to the runtime.
    // app.use(webpackHotMiddleware(complier, {
    // log: console.log,
    // from docs: the path which the middleware will serve the event stream on must match on client
    // path: '/__webpack_hmr',
    // from docs: How often to send heartbeat updates to the client to keep the connection alive. 
    // Should be less than the client's timeout setting - usually set to half its value.
    // heartbeat: 10 * 1000
    // }))
}
// if not in localhost - disable console logger.
else {
    console.log = function(){};
}
// client sockets connected to chat
const clients = [];
// set config based on local development or production env variables
// TODO: use dotenv for configuration
// let keys = null;
// if (env === 'development') {
//   keys = require('../config/keys');
// }
// else if (env === "production") {
//   keys = {
//     "mongo": {
//       "user": process.env.mongo_user,
//       "pw": process.env.mongo_pw
//     }
//   }
// }

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => res.sendFile('./index.html', { root: __dirname }));

// serve the react JS file when GET requested
app.get('/bundle.js', (req, res) => res.sendFile('./dist/bundle.js', { root: __dirname }));

// 404 route - last route - redirect to main login.
app.get('*', (req, res) => res.redirect('/'));

// get cookie after login


// socket IO stuff
// guess you have to do it this way so that when a client connects you know which socket to listen on.
io.on('connect', (socket) => {
    // add this client to clients array
    clients.push(socket);
    console.log(`Client connected: ${socket.id}.`);
    // notify everybody but connected client of the connection
    socket.broadcast.emit('new-connection', new Date().toLocaleTimeString());
    // notify when client disconnects
    socket.on('disconnect', () => socket.broadcast.emit('client-disconnect', new Date().toLocaleTimeString()));
    socket.on('message', (data, ackFn) => {
        let timeStamp = new Date().toLocaleTimeString();
        console.log(`${timeStamp} ---- Message recieved from socket: ${socket.id}`);
        console.log(`Nickname: ${data.sender}`);
        console.log(`Payload: ${data.message.trim()}`);
        // broadcast message to all connected clients except sender
        // we want to broadcast to everybody including the sender
        // socket.broadcast.emit('boardcast', data);
        // send message to all connected clients
        const serverData = {
            ...data,
            timeStamp: timeStamp
        }
        // callback function to acknowledge. Returns timestamp to caller. 
        ackFn(timeStamp);
        io.emit('broadcast', serverData);
    });

});


// start listening for connections
server.listen(PORT, () => console.log(`---------- Node server running and listening on port: ${PORT}`));

