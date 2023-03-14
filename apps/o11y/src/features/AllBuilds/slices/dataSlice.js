import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getBuilds } from 'api/builds';
import { API_STATUSES } from 'constants/common';

import { EMPTY_APPLIED_FILTERS, EMPTY_SELECTED_FILTERS } from '../constants';

import { getAppliedFilters } from './selectors';

export const getBuildsData = createAsyncThunk(
  'buildsList/getBuilds',
  async (data, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const appliedFilters = getAppliedFilters(state);
      const response = await getBuilds({ ...data, filters: appliedFilters });
      return { ...response?.data, ...data, filters: appliedFilters };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const { actions, reducer } = createSlice({
  name: 'buildsList',
  initialState: {
    builds: [],
    selectedFilters: EMPTY_SELECTED_FILTERS,
    appliedFilters: EMPTY_APPLIED_FILTERS,
    apiState: { status: API_STATUSES.IDLE, details: {} },
    buildsPagingParams: {},
    activeBuild: {}
  },
  reducers: {
    setBuilds: (state, { payload }) => {
      state.builds = payload.builds;
      if (payload.buildsPagingParams) {
        state.buildsPagingParams = payload.buildsPagingParams;
      }
    },
    setSelectedFilters: (state, { payload }) => {
      state.selectedFilters = { ...state.selectedFilters, ...payload };
    },
    setAppliedFilters: (state, { payload }) => {
      state.appliedFilters = { ...state.appliedFilters, ...payload };
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
        state.appliedFilters.searchText = payload.filters.searchText
          ? payload.filters.searchText
          : '';
        state.apiState = { status: API_STATUSES.FULFILLED, details: {} };
        state.buildsPagingParams = payload.pagingParams;
      })
      .addCase(getBuildsData.rejected, (state) => {
        state.builds = [];
        state.apiState = { status: API_STATUSES.FAILED, details: {} };
      });
  }
});

export const { setBuilds, setAppliedFilters, setSelectedFilters } = actions;

export default reducer;
