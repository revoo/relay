import React from 'react';

// use css-modules implemented by css-loader with webpack
import classes from './app.css'

const App = () => {
    return <h1 className={classes.header}>REACT LOADED</h1>
}

export default App;