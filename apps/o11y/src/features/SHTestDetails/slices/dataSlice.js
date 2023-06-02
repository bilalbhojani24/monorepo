import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getSnPDetailsBuilds,
  getSnPDetailsStats,
  getSnPDetailsTrend,
  getSnPTestsDetailsInfo
} from 'api/snp';
import { getAllAppliedFilters } from 'features/FilterSkeleton/slices/selectors';
import { getFilterQueryParams } from 'features/FilterSkeleton/utils';

import { TABS } from '../constants';

export const getSnPTestsDetailsInfoData = createAsyncThunk(
  'testlist/getSnPTestsDetailsInfoData',
  async (data, { rejectWithValue, getState }) => {
    try {
      const appliedFilters = getAllAppliedFilters(getState());
      const response = await getSnPTestsDetailsInfo({
        ...data,
        searchString: getFilterQueryParams(appliedFilters).toString()
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const { reducer, actions } = createSlice({
  name: 'SuiteHealthTestDetails',
  initialState: {
    data: {
      testDetailsInfo: {
        isLoading: false,
        data: null
      }
    },
    ui: {
      isDetailsVisible: false,
      showDetailsFor: '',
      cbtInfo: {
        osName: '',
        osVersion: '',
        browserName: '',
        browserVersion: '',
        osKey: '',
        browserKey: '',
        deviceKey: ''
      },
      chartBounds: {
        lower: null,
        upper: null
      },
      activeTab: {
        idx: 1,
        value: TABS.runs
      }
    }
  },
  reducers: {
    setIsSHTestsDetailsVisible: (state, { payload }) => {
      state.ui.isDetailsVisible = payload;
    },
    setShowSHTestsDetailsFor: (state, { payload }) => {
      state.ui.showDetailsFor = payload;
    },
    setSnPCbtInfo: (state, { payload }) => {
      state.ui.cbtInfo = payload;
    },
    setSHTestDetailsChartBounds: (state, { payload }) => {
      state.ui.chartBounds = payload;
    },
    setSHTestDetailsActiveTab: (state, { payload }) => {
      state.ui.activeTab = payload;
    },
    clearTestDetailsInfo: (state) => {
      state.data.testDetailsInfo.isLoading = false;
      state.data.testDetailsInfo.data = null;
    },
    resetActiveTab: (state) => {
      state.ui.activeTab = { idx: 1, value: TABS.runs };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSnPTestsDetailsInfoData.pending, (state) => {
        state.data.testDetailsInfo.isLoading = true;
      })
      .addCase(getSnPTestsDetailsInfoData.fulfilled, (state, { payload }) => {
        state.data.testDetailsInfo.data = payload;
        state.data.testDetailsInfo.isLoading = false;
      })
      .addCase(getSnPTestsDetailsInfoData.rejected, (state) => {
        state.data.testDetailsInfo.isLoading = false;
      });
  }
});

export const {
  setIsSHTestsDetailsVisible,
  setShowSHTestsDetailsFor,
  setSnPCbtInfo,
  setSHTestDetailsChartBounds,
  setSHTestDetailsActiveTab,
  clearTestDetailsInfo,
  resetActiveTab
} = actions;

export const getSnPDetailsStatsData = createAsyncThunk(
  'testlist/getSnPDetailsStatsData',
  async (data, { rejectWithValue, getState }) => {
    try {
      const appliedFilters = getAllAppliedFilters(getState());
      const response = await getSnPDetailsStats({
        ...data,
        searchString: getFilterQueryParams(appliedFilters).toString()
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getSnPDetailsTrendData = createAsyncThunk(
  'testlist/getSnPDetailsTrendData',
  async (data, { rejectWithValue, getState }) => {
    try {
      const appliedFilters = getAllAppliedFilters(getState());
      const response = await getSnPDetailsTrend({
        ...data,
        searchString: getFilterQueryParams(appliedFilters).toString()
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getSnPDetailsBuildsData = createAsyncThunk(
  'testlist/getSnPDetailsBuildsData',
  async (data, { rejectWithValue, getState }) => {
    try {
      const appliedFilters = getAllAppliedFilters(getState());
      const response = await getSnPDetailsBuilds({
        ...data,
        searchString: getFilterQueryParams(appliedFilters).toString()
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export default reducer;
