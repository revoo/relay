import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

// entry point for webpack hot module replacement (HMR).
// Specifying this at the application root level component.
// Events at child components will bubble up to this component and find the module.accept parameter. 
// Webpack looks for this directive to know which modules are allowed to be hot-swapped.

// HMR doesn't work in this application
// if (module.hot) {
    // module.hot.accept();
// }

ReactDOM.render(<App />, document.getElementById('root'));