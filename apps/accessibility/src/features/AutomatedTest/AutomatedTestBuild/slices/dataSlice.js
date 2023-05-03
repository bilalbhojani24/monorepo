import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'buildData',
  initialState: {
    buildData: null,
    customData: null,
    buildMetaData: {
      issueSummary: null,
      meta: null,
      chartData: null
    }
  },
  reducers: {
    setBuildData: (state, { payload }) => {
      const {
        issueSummary,
        meta_v2: metaV2,
        chartData,
        reportData
      } = payload.data;
      state.buildData = reportData;
      state.buildMetaData = {
        issueSummary,
        meta: metaV2,
        chartData
      };
    }
  }
});

export const { setBuildData } = actions;

export default reducer;
