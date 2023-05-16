import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isReportLoading: true,
  isReportErrored: false
};

export const reportContainerSlice = createSlice({
  name: 'reportContainer',
  initialState,
  reducers: {
    setIsReportLoading: (state, action) => {
      state.isReportLoading = action.payload;
    },

    setIsReportErrored: (state, action) => {
      state.isReportErrored = action.payload;
    }
  }
});

export const getIsReportLoading = (state) =>
  state.reportContainer.isReportLoading;

export const getIsReportErrored = (state) =>
  state.reportContainer.isReportErrored;

// Action creators are generated for each case reducer function
export const { setIsReportLoading, setIsReportErrored } =
  reportContainerSlice.actions;

export default reportContainerSlice.reducer;
