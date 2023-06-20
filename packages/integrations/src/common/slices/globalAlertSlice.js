import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  kind: 'info',
  title: '',
  message: '',
  linkText: '',
  linkUrl: '',
  showAlert: false,
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
        state.showAlert = true;
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
      state.showAlert = false;
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
  showAlert: state.globalAlert.showAlert,
  showOnTop: state.globalAlert.showOnTop,
  autoDismiss: state.globalAlert.autoDismiss,
  linkPosition: state.globalAlert.linkPosition,
  hasMessageBody: state.globalAlert.hasMessageBody,
  autoDismissDelay: state.globalAlert.autoDismissDelay
});
