import React from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

import Footer from '../UI/Footer';
import classes from '../app.css';

const LoginPage = () => {
    const history = useHistory();

    const submitAction = (event) => {
        console.log(event.target.nickname.value);
        event.preventDefault();
        // create session cookie which expires on browser exit
        Cookies.set('user', event.target.nickname.value, { sameSite: 'strict', secure: 'true'});
        history.push('/chat');
    }

    return (
        <div className={classes.login}>
            <h1 className={classes.loginHeader}>RELAY</h1>
            <div className={classes.loginForm}>
                <form onSubmit={submitAction}>
                    <input type="text" className={classes.nickNameInput} placeholder="Nickname" name="nickname" required autoFocus></input>
                    <span className={classes.loginIconSVG}></span>
                    <button type="submit">Enter</button>
                </form>
            </div>

            <Footer />
        </div>
    );
}

export default LoginPage;