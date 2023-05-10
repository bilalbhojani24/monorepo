import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    setOptionsForPath: (state, action) => {
      state[action.payload.path] = action.payload.options;
    }
  }
});

export const { setOptionsForPath } = optionsSlice.actions;

export default optionsSlice.reducer;

export const getOptionsForPath = (state, path) => state.options[path];
