import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  height: null
};

export const widgetSlice = createSlice({
  name: 'widget',
  initialState,
  reducers: {
    setWidgetHeight: (state, action) => {
      state.height = action.payload.height;
    }
  }
});

export const { setWidgetHeight } = widgetSlice.actions;

export default widgetSlice.reducer;

export const widgetHeightSelector = (state) => state.widget.height;
