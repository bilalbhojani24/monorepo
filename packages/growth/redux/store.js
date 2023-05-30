import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { chatWidgetSlice } from '../modules/ChatWidget/slices/chatWidgetSlices';

const rootReducers = combineReducers({
  chatWidget: chatWidgetSlice.reducer
});

export const store = configureStore({
  reducer: rootReducers
});
