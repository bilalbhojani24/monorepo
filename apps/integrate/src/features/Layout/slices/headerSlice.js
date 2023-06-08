import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  size: {
    height: 0,
    width: 0
  }
};

export const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setHeaderSize: (state, { payload }) => {
      state.size.height = payload.height || initialState.size.height;
      state.size.width = payload.width || initialState.size.width;
    }
  }
});

export const { setHeaderSize } = headerSlice.actions;
export default headerSlice.reducer;

export const headerSizeSelector = (state) => state.header.size;
