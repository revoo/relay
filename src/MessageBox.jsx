import React from 'react';

const MessageBox = (props) => {
    const style = {
        marginTop: '2rem',
        padding: '13px 15px',
        borderRadius: '8px',
        border: '2px solid #1a73e8',
        outline: '0',
        width: '30vw',
        resize: 'none',
        fontSize: '20px'
    }

    // render messagebox only if nick name is set
    return (props.nickName)
        ?
        <textarea
            placeholder="Start typing a message..."
            style={style}
            ref={props.messageElement}
            onKeyDown={props.pushMessageEventHandler}>
        </textarea>
        :
        <p>Please enter a nick name before typing a message.</p>
};

export default MessageBox;