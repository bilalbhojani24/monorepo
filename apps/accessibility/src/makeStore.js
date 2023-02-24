import { configureStore } from '@reduxjs/toolkit';

// if (IS_DEV) {
// push in logger as the last middleware
// eslint-disable-next-line global-require
// const { createLogger } = require('redux-logger');

// middleware.push(createLogger({ diff: true, collapsed: true }));
// }

export default function makeStore(reducer) {
  return configureStore({
    // devTools: false,
    // middleware,
    reducer
  });
}
