import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import reportWebVitals from './reportWebVitals';

import { CookiesProvider } from 'react-cookie';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider>
    <React.Fragment>
      <Router >
        <App />
        ©2022 Splitsy Inc. All rights reserved.
      </Router>
    </React.Fragment>
  </CookiesProvider>
);


reportWebVitals();
