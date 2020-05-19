import io from 'socket.io-client';

// process.env gets injected by a webpack plugin called dotenv-webpack during webpack build.
// only variables that are directly referenced get injected. Everything else gets ignored in the resulting bundle 
// for security purposes (not to expose sensetive info)
// create-react-script (CRA) uses the convention of prefxing with REACT_APP so this follows that convetion

// webpack definePlugin rule will inject hostname based on webpack config file 
const socket = io.connect(WEBPACK_WILL_INJECT_HOSTNAME);
socket.emit('message', 'hello');
export default socket;