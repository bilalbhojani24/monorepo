import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSharableLinkGenerating: false,
  shareableLinkForReport: null
};

export const reportHeaderSlice = createSlice({
  name: 'reportHeader',
  initialState,
  reducers: {
    setIsSharableLinkGenerating: (state, action) => {
      state.isSharableLinkGenerating = action.payload;
    },

    setShareableLinkForReport: (state, action) => {
      state.shareableLinkForReport = action.payload;
    }
  }
});

export const getIsSharableLinkGenerating = (state) =>
  state.reportHeader.isSharableLinkGenerating;

export const getShareableLinkForReport = (state) =>
  state.reportHeader.shareableLinkForReport;

// Action creators are generated for each case reducer function
export const { setIsSharableLinkGenerating, setShareableLinkForReport } =
  reportHeaderSlice.actions;

export default reportHeaderSlice.reducer;
