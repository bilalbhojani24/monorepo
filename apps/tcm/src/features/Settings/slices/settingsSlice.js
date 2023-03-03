import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  apiKey: '',
  currentTab: '',
  jiraConfiguration: {},
  settingsApiKeys: {}
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setApiKey: (state, { payload }) => {
      state.apiKey = payload;
    },
    getJiraConfigFulfilled: (state, { payload }) => {
      state.jiraConfiguration = payload;
    },
    getJiraConfigFailed: (state, { payload }) => {
      state.jiraConfiguration = payload;
    },
    getSettingsApiKeysFulfilled: (state, { payload }) => {
      state.settingsApiKeys = payload;
    },
    getSettingsApiKeysFailed: (state, { payload }) => {
      state.settingsApiKeys = payload;
    }
    // setCurrentTab: (state, { payload }) => {
    //   state.currentTab = payload;
    // }
  }
});

export const {
  setApiKey,
  getJiraConfigFulfilled,
  getJiraConfigFailed,
  getSettingsApiKeysFulfilled,
  getSettingsApiKeysFailed
} = settingsSlice.actions;

export default settingsSlice.reducer;
