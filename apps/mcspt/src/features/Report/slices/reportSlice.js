import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sessionData: {}
};

export const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    updateSessionMetrics: (state, action) => {
      state.sessionData = action.payload;
    }
  }
});

export const getSessionMetrics = (state) => state.report.sessionData;

// Action creators are generated for each case reducer function
export const { updateSessionMetrics } = reportSlice.actions;

export default reportSlice.reducer;
