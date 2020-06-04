import React from 'react';
import ReactDOM from 'react-dom';

import Router from './Router';

// entry point for webpack hot module replacement (HMR).
// Specifying this at the application root level component.
// Events at child components will bubble up to this component and find the module.accept parameter. 
// Webpack looks for this directive to know which modules are allowed to be hot-swapped.

// HMR doesn't work in this application
// if (module.hot) {
// module.hot.accept();
// }

ReactDOM.render(
    <React.StrictMode>
        <Router />
    </React.StrictMode>,
    document.getElementById('root'));