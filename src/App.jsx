import React, { useState, useRef, useEffect, useCallback } from 'react';
import { debounce } from 'debounce';

import socketEmitter from './socketEmitter';
import socketListener from './socketListener';
import NickNameInput from './NickNameInput';
import ChatBox from './ChatBox';
import MessageBox from './MessageBox';
import Message from './Message';

// use css-modules implemented by css-loader with webpack
// css-modules and react in general can't understand hyphens so 
// all CSS related variables use camelCase.
import classes from './app.css'

const App = () => {
    const [nickName, setNickName] = useState();
    const [loggedIn, setLoggedIn] = useState(false);
    const [messages, setMessages] = useState([]);
    const [recieveEvents, setRecieveEvents] = useState(false);
    const [emitEvents, setEmitEvents] = useState(false);
    const messageElement = useRef();
    const chatElement = useRef();

    console.debug('DEBUG: Main app component rendered.');

    // setters
    /* NOTE: passing setState callbacks to children components is a good react pattern 
             to hoist state to the highest general component and distribute it from there */
    const setNickNameHandler = (event) => {
        console.log('STATE CHANGE ---------- set nickname handler.');
        const newNickName = event.target.value.trim();
        if (newNickName !== ''
            && newNickName !== nickName
            && (event.key === 'Enter' || event.type === 'blur')) {
            setNickName(newNickName.trim());
            setLoggedIn(true);
            setRecieveEvents(true);
            console.log('DEBUG: Nick name set.');
        }
    }

    // constructs and sets messages
    // usecall back here because this function gets re-created on every render.
    // it needs to be re-created only when messages changes. Use memoized return if messages didn't change.
    const setMessagesHandler = useCallback((sender, messageContents, timeStamp, isServer = false) => {
        // queue a message
        console.log('STATE CHANGE ---------- set messages handler.', sender);
        setMessages([...messages, <Message sender={sender} messageContents={messageContents} timeStamp={timeStamp} isServer={isServer} />]);
    }, [messages]);


    // emits a new message
    const pushMessageEventHandler = (event) => {
        console.log('Typing a message...');
        if (event.key === 'Enter' && event.target.value.trim() !== '') {
            event.preventDefault();
            // emit an event
            // third parameter (immediate) executes the function at the start of the interval instead of tail.
            let sendMessageDebounced = debounce(socketEmitter.sendMessage, 100, true);
            sendMessageDebounced(<Message sender={nickName} messageContents={event.target.value} />)
            event.target.value = '';
        }
        // don't insert newline if messagebox is empty
        else if (event.key === 'Enter' && event.target.value.trim() === '') {
            event.preventDefault()
        }
    }

    useEffect(() => {
        // subscribe to socket events
        if (recieveEvents) {
            socketListener(setMessagesHandler);
        }
    }, [setMessagesHandler, recieveEvents]);
    // , [setMessagesHandler]); this line fixed the lost chat history
    // Javascript closures - is that the function setMessagesHandler gets re-created every time the parent component 'App' re-renders.
    // this means that if useEffect doesn't run everytime setMessagesHandler re-creates then it will run on an older version with stale data.
    // but in that case I don't need useEffect. I guess I do because the parent 'App' component can re-render without changing messages.
    // In any case this is good practice. When a function in useEffect doesn't 'close over' state then it doesn't need to be in the dep array.
    // however since on every re-render react gives new state to its child functions, the useEffect hook needs to re-run.
    // setMessagesHandler will return a memoized result back unless the 'messages' state changes in which it will run again.

    // don't perform side effects while rendering. use side effects in useEffect.
    return (
        <div>
            <h1>RELAY 1.0</h1>

            <NickNameInput setNickNameHandler={setNickNameHandler} />
            <ChatBox chatContents={messages} />
            <MessageBox nickName={nickName} pushMessageEventHandler={pushMessageEventHandler} />

        </div >
    )
}

export default App;