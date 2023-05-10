import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  baseURL: '/'
};

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setConfig: (state, action) => {
      state.baseURL = action.payload.baseURL;
    }
  }
});

export const { setConfig } = configSlice.actions;

export default configSlice.reducer;

export const baseURLSelector = (state) => state.config.baseURL;
