import React from 'react';
import { useState, useRef, useEffect } from 'react';

import Socket from './Socket';
import Message from './Message';
// use css-modules implemented by css-loader with webpack
// css-modules and react in general can't understand hyphens so 
// all CSS related variables use camelCase.
import classes from './app.css'

const App = () => {
    const [nickName, setNickName] = useState();
    const [messages, setMessages] = useState([]);
    const messageElement = useRef();
    const chatElement = useRef();

    console.debug('React loaded.');

    const sendMessage = (message, sender) => {
        console.debug(`Sending message: ${message} from ${sender}`)
        Socket.emit('message', {
            sender: sender, message: message
        });
    }

    // listen for message broadcasts
    Socket.on('broadcast', (data) => {
        console.debug(`Recieved message from another client: ${data.message}`);
        setMessages([...messages, <Message key={messages.length} sender={data.sender} messageContents={data.message} timeStamp={data.timeStamp} />]);
    })

    // listen for new clients broadcasts
    Socket.on('new-connection', (timeStamp) => {
        console.debug('new connection');
        setMessages([...messages, <Message key={messages.length} sender={''} messageContents={'New Person Connected!'} timeStamp={timeStamp} isServer={true}/>]);
    });

    // listen for client disconnects
    Socket.on('client-disconnect', (timeStamp) => {
        console.debug('disconnection');
        setMessages([...messages, <Message key={messages.length} sender={''} messageContents={'Person Disconnected!'} timeStamp={timeStamp} isServer={true}/>]);
    });
    // render message area only if nick name is set 
    const messageArea = (nickName)
        ?
        <textarea
            placeholder="Start typing a message..."
            ref={messageElement}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    sendMessage(e.target.value, nickName)
                    e.target.value = '';
                }
            }}
            className={classes.messageArea}>
        </textarea>
        :
        <p>Please enter a nick name before typing a message.</p>

    // hook to run this function to focus on the message area everytime the nickName is changed.
    useEffect(() => {
        // Only focus if nickname is set and thus the textarea is actually showing
        if (nickName) {
            messageElement.current.focus();
        }
    }, [nickName]);

    // scroll to bottom of chat AFTER set messages runs so we go all the way to the bottom
    useEffect(() => {
        chatElement.current.scrollTop = chatElement.current.scrollHeight;
    }, [messages]);

    return (
        <div>
            {/* <h1 className={classes.header}>REACT LOADED</h1> */}
            <input
                autoFocus
                className={classes.nickName}
                placeholder="Nickname"
                onBlur={(e) => setNickName(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        setNickName(e.target.value);
                    }
                }}>
            </input>

            <div ref={chatElement} className={classes.chatArea}>
                {messages && messages.length ? messages : <p style={{ padding: '0.1rem 0.1rem', fontSize: '18px' }}>No Messages.</p>}
            </div>

            {messageArea}
        </div >
    )
}

export default App;