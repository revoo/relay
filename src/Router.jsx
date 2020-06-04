import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LoginPage from './Pages/LoginPage';
import AppPage from './Pages/AppPage';

const Router = () => {
    // first component that gets rendered. Configures the routes.
    return (
        <BrowserRouter>
            <Switch>

                <Route path="/" exact component={LoginPage}>
                </Route>

                <Route path="/chat" render={(props) => {
                    // pass in nickname to AppPage - first parse it.
                    let urlParameter = props.location.search;
                    let nickName = urlParameter.replace("?nickname=", "");
                    
                    return <AppPage nickName={nickName} />;
                }}>
                </Route>

            <Route path="*">
                <h1>This page does not exist!</h1>
            </Route>

            </Switch>
        </BrowserRouter >
    );
}

export default Router;