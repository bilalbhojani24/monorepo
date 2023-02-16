import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  apiKey: '',
  currentTab: ''
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setApiKey: (state, { payload }) => {
      state.apiKey = payload;
    },
    setCurrentTab: (state, { payload }) => {
      state.currentTab = payload;
    }
  }
});

export const { setApiKey, setCurrentTab } = settingsSlice.actions;

export default settingsSlice.reducer;
