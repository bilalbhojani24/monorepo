import { combineReducers } from 'redux';

import chatWidgetSlice from './slices/chatWidgetSlices';

const rootReducer = combineReducers({
  chatWidget: chatWidgetSlice.reducer
});

export default rootReducer;
