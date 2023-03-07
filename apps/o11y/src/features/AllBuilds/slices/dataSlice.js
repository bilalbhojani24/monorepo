import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getBuilds } from 'api/builds';

import { API_STATUSES } from '../../../constants/common';

export const getBuildsData = createAsyncThunk(
  'buildsList/getBuilds',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getBuilds({ ...data });
      return { ...response?.data, ...data };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const { actions, reducer } = createSlice({
  name: 'buildsList',
  initialState: {
    builds: [],
    apiState: { status: API_STATUSES.IDLE, details: {} },
    buildsPagingParams: {},
    activeBuild: {}
  },
  reducers: {
    setBuilds: (state, { payload }) => {
      state.builds = payload.builds;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBuildsData.pending, (state) => {
        state.apiState = { status: API_STATUSES.PENDING, details: {} };
      })
      .addCase(getBuildsData.fulfilled, (state, { payload }) => {
        const newBuilds = [...state.builds, ...payload.builds];
        state.builds = newBuilds;
        state.apiState = { status: API_STATUSES.FULFILLED, details: {} };
        state.buildsPagingParams = payload.pagingParams;
      })
      .addCase(getBuildsData.rejected, (state) => {
        state.builds = [];
        state.apiState = { status: API_STATUSES.FAILED, details: {} };
      });
  }
});

export const { setBuilds } = actions;

export default reducer;
