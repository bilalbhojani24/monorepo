import { createSlice } from '@reduxjs/toolkit';

export const ALERT_MODIFIER = [
  'base',
  'primary',
  'success',
  'error',
  'warn',
  'info'
];

const initialState = {
  kind: 'info',
  title: '',
  message: '',
  linkText: '',
  linkUrl: ''
};

export const globalAlertSlice = createSlice({
  name: 'globalAlert',
  initialState,
  reducers: {
    setGlobalAlert: (state, action) => {
      state.kind = action.payload.kind ?? 'info';
      state.title = action.payload.title ?? '';
      state.message = action.payload.message ?? '';
      state.linkText = action.payload.linkText ?? '';
      state.linkUrl = action.payload.linkUrl ?? '';
    },
    clearGlobalAlert: (state) => {
      state.kind = initialState.kind;
      state.title = initialState.title;
      state.message = initialState.message;
      state.linkText = initialState.linkText;
      state.linkUrl = initialState.linkUrl;
    }
  }
});

export const { setGlobalAlert, clearGlobalAlert } = globalAlertSlice.actions;

export default globalAlertSlice.reducer;

export const globalAlertStateSelector = (state) => ({
  kind: state.globalAlert.kind,
  title: state.globalAlert.title,
  message: state.globalAlert.message,
  linkText: state.globalAlert.linkText,
  linkUrl: state.globalAlert.linkUrl
});
