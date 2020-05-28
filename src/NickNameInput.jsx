import React from 'react';

const NickNameInput = (props) => {

    const style = {
        marginBottom: '2rem',
        padding: '8px 12px',
        borderRadius: '8px',
        border: '2px solid #1a73e8',
        outline: '0',
        fontSize: '14px',
        width: '5vw'
    }

    return <input
        autoFocus
        style={style}
        placeholder="Nickname"
        onBlur={props.setNickNameHandler}
        onKeyDown={props.setNickNameHandler}>
    </input>
}

export default NickNameInput;