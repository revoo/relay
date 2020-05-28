import io from 'socket.io-client'

// singleton so only one socket instance per client is ever spawned

const socket = io.connect(WEBPACK_WILL_INJECT_HOSTNAME);

export default socket;