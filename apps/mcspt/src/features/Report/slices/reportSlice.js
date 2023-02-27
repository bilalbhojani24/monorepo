import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sessionData: {},
  latestSeekTimeInSeconds: undefined
};

export const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    updateSessionMetrics: (state, action) => {
      state.sessionData = action.payload;
    },
    updateLatestSeekTimeInSeconds: (state, action) => {
      let value = action.payload;

      if ((value !== 0 && !!value) || value === 0) {
        value = Math.round(value);
      } else {
        value = undefined;
      }

      state.latestSeekTimeInSeconds = value;
    }
  }
});

export const getSessionMetrics = (state) => state.report.sessionData;
export const getLatestSeekTimeInSeconds = (state) =>
  state.report.latestSeekTimeInSeconds;

// Action creators are generated for each case reducer function
export const { updateSessionMetrics, updateLatestSeekTimeInSeconds } =
  reportSlice.actions;

export default reportSlice.reducer;
