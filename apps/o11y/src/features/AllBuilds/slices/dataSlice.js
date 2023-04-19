import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getBuildFilterDetails,
  getBuilds,
  getBuildTags,
  getUserNames
} from 'api/builds';
import { API_STATUSES } from 'constants/common';

import {
  EMPTY_APPLIED_FILTERS,
  EMPTY_METADATA_FILTERS,
  EMPTY_SELECTED_FILTERS
} from '../constants';

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

const getBuildsFilters = (item) => {
  const data = {};
  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.get('search')) {
    data.searchText = searchParams.get('search');
  }
  ['statuses', 'users', 'tags', 'frameworks'].forEach((key) => {
    if (searchParams.get(key)) {
      data[key] = searchParams.get(key).split(',');
    }
  });
  if (searchParams.get('dateRange')) {
    const [startDate, endDate] = searchParams.get('dateRange').split(',');
    data.dateRange = {
      lowerBound: parseInt(startDate, 10),
      upperBound: parseInt(endDate, 10)
    };
  }
  if (item === 'selected') {
    return { ...EMPTY_SELECTED_FILTERS, ...data };
  }
  if (item === 'applied') {
    return { ...EMPTY_APPLIED_FILTERS, ...data };
  }
  return { ...data };
};

const { actions, reducer } = createSlice({
  name: 'buildsList',
  initialState: {
    builds: [],
    selectedFilters: getBuildsFilters('selected'),
    appliedFilters: getBuildsFilters('applied'),
    filtersMetaData: { ...EMPTY_METADATA_FILTERS },
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
    cancelSelectedFilters: (state) => {
      state.selectedFilters = { ...state.appliedFilters };
    },
    setAppliedFilters: (state, { payload }) => {
      state.appliedFilters = { ...state.appliedFilters, ...payload };
    },
    setFiltersMetaData: (state, { payload }) => {
      state.filtersMetaData = { ...state.filtersMetaData, ...payload };
    },
    findAndUpdateBuilds: (state, { payload }) => {
      const updatedBuilds = payload || [];
      updatedBuilds.forEach((build) => {
        const idxToUpdate = state.builds.findIndex(
          (item) => item.uuid === build.uuid
        );
        if (idxToUpdate !== -1) {
          state.builds[idxToUpdate] = build;
        }
      });
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
        state.appliedFilters.searchText = payload?.filters?.searchText
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

export const {
  setBuilds,
  setAppliedFilters,
  setSelectedFilters,
  setFiltersMetaData,
  findAndUpdateBuilds,
  cancelSelectedFilters
} = actions;

export default reducer;

export const getBuildTagsData = createAsyncThunk(
  'buildsList/getBuildTags',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getBuildTags({ ...data });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const getUserNamesData = createAsyncThunk(
  'buildsList/getUserNames',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getUserNames({ ...data });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getBuildFilterDetailsData = createAsyncThunk(
  'buildsList/getFilterDetails',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getBuildFilterDetails({ ...data });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
