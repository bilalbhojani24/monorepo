import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  kind: 'info',
  title: '',
  message: '',
  linkText: '',
  linkUrl: '',
  autoDismiss: false,
  autoDismissDelay: 3
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
      state.autoDismiss = action.payload.autoDismiss ?? false;
      state.autoDismissDelay =
        action.payload.autoDismissDelay ?? initialState.autoDismissDelay;
    },
    clearGlobalAlert: (state) => {
      state.kind = initialState.kind;
      state.title = initialState.title;
      state.message = initialState.message;
      state.linkText = initialState.linkText;
      state.linkUrl = initialState.linkUrl;
      state.autoDismiss = initialState.autoDismiss;
      state.autoDismissDelay = initialState.autoDismissDelay;
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
  linkUrl: state.globalAlert.linkUrl,
  autoDismiss: state.globalAlert.autoDismiss,
  autoDismissDelay: state.globalAlert.autoDismissDelay
});
