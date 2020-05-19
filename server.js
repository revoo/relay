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

app.get('/', (req, res) => res.sendFile('./index.html', {root: __dirname}));

// serve the react JS file when GET requested
app.get('/bundle.js', (req, res) => res.sendFile('./dist/bundle.js', {root: __dirname}));


// socket IO stuff
// guess you have to do it this way so that when a client connects you know which socket to listen on.
io.on('connect', (socket) => {
    // add this client to clients array
    clients.push(socket);
    console.log(`Client connected: ${socket.id}.`);
    socket.on('message', (socket) => console.log(`TESTING: ${socket.id}.`));
});


// io.on('test', (socket) => console.log(`client sent: ${socket}`));
// start listening for connections
server.listen(PORT, () => console.debug(`---------- Node server running and listening on port: ${PORT}`));

