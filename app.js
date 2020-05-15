const express = require('express');

const app = express();

// PaaS service like Heroku will assign us a port, if running locally use 5000.
const PORT = process.env.PORT || 5000;
// Determine local or production (Heroku)
const env = process.env.NODE_ENV || 'development';
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

app.listen(PORT, () => console.debug(`Node server running and listening on port: ${PORT}`));

