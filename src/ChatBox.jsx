import React, { useRef, useEffect } from 'react';

const ChatBox = (props) => {
    const style = {
        width: '55vw',
        height: '55vh',
        border: '2px solid #1a73e8',
        borderRadius: '8px',
        overflow: 'auto',
        backgroundColor: 'white',
        wordWrap: 'break-word'
    }

    const chatElement = useRef();
     // scroll to bottom of chat AFTER set messages runs so we go all the way to the bottom
     useEffect(() => {
        if (chatElement.current !== undefined) {
            chatElement.current.scrollTop = chatElement.current.scrollHeight;    
        }
    }, [props.chatContents]);

    return (
        <div style={style} ref={chatElement} >
            {props.chatContents}
        </div>
    );
}

export default ChatBox;