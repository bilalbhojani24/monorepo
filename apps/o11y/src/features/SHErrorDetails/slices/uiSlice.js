import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'snpErrorDetails',
  initialState: {
    isDetailsVisible: false,
    showDetailsFor: {
      testId: '',
      errorId: ''
    },
    cbtInfo: {
      osName: '',
      osVersion: '',
      browserName: '',
      browserVersion: '',
      osKey: '',
      browserKey: ''
    }
  },
  reducers: {
    setIsSnPErrorDetailsVisible: (state, { payload }) => {
      state.isDetailsVisible = payload;
    },
    setShowSnPErrorDetailsFor: (state, { payload }) => {
      state.showDetailsFor = {
        testId: payload.testId,
        errorId: payload.errorId
      };
    },
    setSnPErrorCbtInfo: (state, { payload }) => {
      state.cbtInfo = payload;
    }
  }
});

export const {
  setIsSnPErrorDetailsVisible,
  setShowSnPErrorDetailsFor,
  setSnPErrorCbtInfo
} = actions;

export default reducer;
