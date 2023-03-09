import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'snpDetails',
  initialState: {
    isDetailsVisible: false,
    showDetailsFor: '',
    cbtInfo: {
      osName: '',
      osVersion: '',
      browserName: '',
      browserVersion: ''
    }
  },
  reducers: {
    setIsSnPDetailsVisible: (state, { payload }) => {
      state.isDetailsVisible = payload;
    },
    setShowSnPDetailsFor: (state, { payload }) => {
      state.showDetailsFor = payload;
    },
    setSnPCbtInfo: (state, { payload }) => {
      state.cbtInfo = payload;
    }
  }
});

export const { setIsSnPDetailsVisible, setShowSnPDetailsFor, setSnPCbtInfo } =
  actions;

export default reducer;
