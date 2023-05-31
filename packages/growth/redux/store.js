import { configureStore } from '@reduxjs/toolkit';

import chatWidgetSlice from '../modules/ChatWidget/slices/chatWidgetSlices';

export const reducers = {
  chatWidget: chatWidgetSlice
};

export const store = configureStore({
  reducer: reducers
});
