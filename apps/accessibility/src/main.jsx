import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { SkipToContent } from '@browserstack/bifrost';

import 'api/interceptor';

import Layout from './common/Layout';
import store from './store';

import './index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <SkipToContent>Skip to main content</SkipToContent>
        <Layout />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
