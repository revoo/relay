/* eslint-disable react/prop-types */
import React from 'react';

// layout of the message in the chat
const Message = (props) => {
    const messageStyle = {
        fontSize: '18px',
        color: 'black'
    }

    let messageContents;
    if (props.isServer) {
        messageContents = <p style={{ ...messageStyle, fontStyle: 'italic'}}>{props.timeStamp}: {props.messageContents}</p>;
    }
    else {
        messageContents = <p style={messageStyle}>{props.timeStamp} - <b>{props.sender}</b>: {props.messageContents}</p>;
    }

    return (
        messageContents
    );
}

export default Message;