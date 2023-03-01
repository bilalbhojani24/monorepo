import { configureStore } from '@reduxjs/toolkit';

export default function makeStore(reducer) {
  return configureStore({
    // devTools: false,
    // middleware,
    reducer
  });
}
