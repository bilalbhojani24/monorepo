import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  kind: 'info',
  title: '',
  message: '',
  linkText: '',
  linkUrl: '',
  showOnTop: false,
  autoDismiss: false,
  autoDismissDelay: 4,
  hasMessageBody: true,
  linkPosition: 'inline'
};

export const globalAlertSlice = createSlice({
  name: 'globalAlert',
  initialState,
  reducers: {
    setGlobalAlert: (state, action) => {
      if (!state.showOnTop) {
        state.kind = action.payload.kind ?? 'info';
        state.title = action.payload.title ?? '';
        state.message = action.payload.message ?? '';
        state.linkText = action.payload.linkText ?? '';
        state.linkUrl = action.payload.linkUrl ?? '';
        state.autoDismiss = action.payload.autoDismiss ?? false;
        state.autoDismissDelay =
          action.payload.autoDismissDelay ?? initialState.autoDismissDelay;
        state.showOnTop = action.payload.showOnTop ?? initialState.showOnTop;
        state.linkPosition =
          action.payload.linkPosition ?? initialState.linkPosition;
        state.hasMessageBody =
          action.payload.hasMessageBody ?? initialState.hasMessageBody;
      }
    },
    clearGlobalAlert: (state) => {
      state.kind = initialState.kind;
      state.title = initialState.title;
      state.message = initialState.message;
      state.linkUrl = initialState.linkUrl;
      state.linkText = initialState.linkText;
      state.showOnTop = initialState.showOnTop;
      state.autoDismiss = initialState.autoDismiss;
      state.linkPosition = initialState.linkPosition;
      state.autoDismissDelay = initialState.autoDismissDelay;
      state.hasMessageBody = initialState.hasMessageBody;
    }
  }
});

export const { setGlobalAlert, clearGlobalAlert } = globalAlertSlice.actions;

export default globalAlertSlice.reducer;

export const globalAlertStateSelector = (state) => ({
  kind: state.globalAlert.kind,
  title: state.globalAlert.title,
  message: state.globalAlert.message,
  linkUrl: state.globalAlert.linkUrl,
  linkText: state.globalAlert.linkText,
  showOnTop: state.globalAlert.showOnTop,
  autoDismiss: state.globalAlert.autoDismiss,
  linkPosition: state.globalAlert.linkPosition,
  hasMessageBody: state.globalAlert.hasMessageBody,
  autoDismissDelay: state.globalAlert.autoDismissDelay
});
