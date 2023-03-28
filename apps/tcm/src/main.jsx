import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { initErrorLogger } from '@browserstack/utils';
import { PRODUCTION_HOST } from './const/immutables';

import App from './App';
import { store } from './store';

import './index.scss';

if (window.location.hostname === PRODUCTION_HOST) {
  initErrorLogger({
    dsn: 'https://6707e9548518483b9931877fd670e35e@o70254.ingest.sentry.io/4504853198929920',
    debug: false,
    release: 'v0.1-tcm',
    environment: 'production',
    sampleRate: 1.0
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>,
);
