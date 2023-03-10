import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import 'api/interceptor';

import { initLogger } from '../../../packages/utils/src/logger';

import Layout from './common/Layout';
import store from './store';

import './index.scss';

const keys = {
  amplitudeKey: '985eaa9c45d824a94344e64a2a3ca724',
  amplitudeConfig: {
    key: '985eaa9c45d824a94344e64a2a3ca724',
    userData: {},
    groupData: {}
  },
  analyticsKey: 'UA-418548-19',
  EDSDetails: {
    userDetails: '12',
    config: {
      server: 'eds.browserstack.com',
      port: '443',
      api: '3T5kkUTZ2cGiy0zhLwyxBdDbx0GeJuZQd'
    }
  }
};

initLogger(keys);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
