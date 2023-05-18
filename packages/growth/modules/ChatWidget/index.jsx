import React from 'react';
import { Provider } from 'react-redux';

import store from '../../redux/store';

import ChatWidget from './components/ChatWidget';

const FreshChat = () => (
  <Provider store={store}>
    <ChatWidget />
  </Provider>
);

export default FreshChat;
