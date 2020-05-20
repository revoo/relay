import io from 'socket.io-client';


// process.env gets injected by a webpack plugin called dotenv-webpack during webpack build.
// only variables that are directly referenced get injected. Everything else gets ignored in the resulting bundle 
// for security purposes (not to expose sensetive info)
// create-react-script (CRA) uses the convention of prefxing with REACT_APP so this follows that convetion
// This is not used here though, the webpack DefinePlugin function is used here 
// to preform text replacement for WEBPACK_WILL_INJECT_HOSTNAME with another var

// webpack definePlugin rule will inject hostname based on webpack config file 
const Socket = io.connect(WEBPACK_WILL_INJECT_HOSTNAME);
export default Socket;