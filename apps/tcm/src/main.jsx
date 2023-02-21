import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import 'api/_utils/interceptor';

import App from './App';
import { store } from './store';

import './index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>,
);
