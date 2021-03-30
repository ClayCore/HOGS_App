import * as serviceWorker from './serviceWorker';

import { $, initFontLibrary } from './utils';

import App from './website/App';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

const ENV = process.env.NODE_ENV;
if (ENV === 'development') {
    serviceWorker.register();
} else {
    serviceWorker.unregister();
}

(function () {
    // Add styles and the font library.
    require('./website/styles/master.scss');
    initFontLibrary();

    window.addEventListener('load', () => {
        // Determine the basename for the router and grab the entry point.
        const basename = window.location.pathname || '';
        const entry_point = $('#root');

        // Start rendering
        ReactDOM.render(
            <Router basename={basename}>
                <App />
            </Router>,
            entry_point
        );
    });
})();
