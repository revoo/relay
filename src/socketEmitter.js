/*
ES6 Modules are singletons. If a module is imported multiple times, only a single instance of it exists and it is evaluated only once at load
Each module has Evaluated flag which makes sure to evaluate the module code only once.
Modules are cached on first load and not re-run
*/
import socket from './socket';

const socketEmitter = {
    sendMessage: (message, enabled = true) => {
        console.log('attempting to send message');
        if (enabled) {
            // console.debug(`Sending messages. In queue: ${messageQueue.length}`);
            console.debug(`Sending message: ${message.props.messageContents} from ${message.props.sender}`);
            socket.emit('message', {
                sender: message.props.sender, message: message.props.messageContents
            }, (ackTimestamp) => {
                console.log(`Message sent confirmed. Server timestamp: ${ackTimestamp}`);
            });
        }
        console.log('Socket EMITTER - SendMessage ran.');
    },

    // next emitter event...
}

export default socketEmitter;