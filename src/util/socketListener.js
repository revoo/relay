import socket from './socket';

const socketListener = (setMessagesHandler) => {
    socket.removeAllListeners();

    socket.on('broadcast', (data) => {
        console.debug(`Recieved message from another client: ${data.message}`);
        setMessagesHandler(data.sender, data.message, data.timeStamp);
    });

    // listen for new clients broadcasts
    socket.on('new-connection', (timeStamp) => {
        console.debug('new connection');
        let data = {
            sender: '',
            message: 'New Person Connected!',
            timeStamp: timeStamp,
            isServer: true
        }
        setMessagesHandler(data.sender, data.message, data.timeStamp, data.isServer);
        // dispatch({ type: 'DISPLAY_MESSAGE', data: <Message key={messageLength} sender={''} messageContents={'New Person Connected!'} timeStamp={timeStamp} isServer={true} /> })
        // props.setMessages([...props.messages, <Message key={props.messages.length} sender={''} messageContents={'New Person Connected!'} timeStamp={timeStamp} isServer={true} />]);
    });

    // listen for client disconnects
    socket.on('client-disconnect', (timeStamp) => {
        console.debug('disconnection');
        let data = {
            sender: '',
            message: 'Person Disconnected!',
            timeStamp: timeStamp,
            isServer: true
        }
        setMessagesHandler(data.sender, data.message, data.timeStamp, data.isServer);
    });


    console.log('Socket LISTENER ran.');
};

export default socketListener;

