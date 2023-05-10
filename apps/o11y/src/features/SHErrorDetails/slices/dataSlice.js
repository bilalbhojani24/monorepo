import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getSnPErrorDetailsBuilds,
  getSnPErrorDetailsErrorCount,
  getSnPErrorDetailsInfo,
  getSnPErrorDetailsPlatforms,
  getSnPErrorDetailsTrend
} from 'api/snp';
import { getAllSnPTestFilters } from 'features/SuiteHealth/slices/selectors';

import { TABS } from '../constants';

export const getSnPErrorDetailsInfoData = createAsyncThunk(
  'testlist/getSnPErrorDetailsInfoData',
  async (data, { rejectWithValue, getState }) => {
    try {
      const filters = getAllSnPTestFilters(getState());
      const response = await getSnPErrorDetailsInfo({ ...data, filters });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const { reducer, actions } = createSlice({
  name: 'SuiteHealthErrorDetails',
  initialState: {
    data: {
      errorDetailsInfo: {
        isLoading: false,
        data: null
      }
    },
    ui: {
      isDetailsVisible: false,
      showDetailsFor: {
        testId: '',
        errorId: ''
      },
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
      },
      showAllBuilds: false
    }
  },
  reducers: {
    setIsUEDetailsVisible: (state, { payload }) => {
      state.ui.isDetailsVisible = payload;
    },
    setShowUEDetailsFor: (state, { payload }) => {
      state.ui.showDetailsFor = {
        testId: payload.testId,
        errorId: payload.errorId
      };
    },
    setUECbtInfo: (state, { payload }) => {
      state.ui.cbtInfo = payload;
    },
    setUEDetailsChartBounds: (state, { payload }) => {
      state.ui.chartBounds = payload;
    },
    setUEDetailsActiveTab: (state, { payload }) => {
      state.ui.activeTab = payload;
    },
    setShowAllBuilds: (state, { payload }) => {
      state.ui.showAllBuilds = payload;
    },
    clearUEDetailsInfo: (state) => {
      state.data.errorDetailsInfo.isLoading = false;
      state.data.errorDetailsInfo.data = null;
    },
    resetUEDetailsActiveTab: (state) => {
      state.ui.activeTab = { idx: 1, value: TABS.runs };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSnPErrorDetailsInfoData.pending, (state) => {
        state.data.errorDetailsInfo.isLoading = true;
      })
      .addCase(getSnPErrorDetailsInfoData.fulfilled, (state, { payload }) => {
        state.data.errorDetailsInfo.data = payload;
        state.data.errorDetailsInfo.isLoading = false;
      })
      .addCase(getSnPErrorDetailsInfoData.rejected, (state) => {
        state.data.errorDetailsInfo.isLoading = false;
      });
  }
});

export const {
  setIsUEDetailsVisible,
  setShowUEDetailsFor,
  setUECbtInfo,
  setUEDetailsChartBounds,
  setUEDetailsActiveTab,
  clearUEDetailsInfo,
  resetUEDetailsActiveTab,
  setShowAllBuilds
} = actions;

export const getSnPErrorDetailsTrendData = createAsyncThunk(
  'testlist/getSnPErrorDetailsTrendData',
  async (data, { rejectWithValue, getState }) => {
    try {
      const filters = getAllSnPTestFilters(getState());
      const response = await getSnPErrorDetailsTrend({ ...data, filters });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getSnPErrorDetailsBuildsData = createAsyncThunk(
  'testlist/getSnPErrorDetailsBuildsData',
  async (data, { rejectWithValue, getState }) => {
    try {
      const filters = getAllSnPTestFilters(getState());
      const response = await getSnPErrorDetailsBuilds({ ...data, filters });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const getSnPErrorDetailsPlatformsData = createAsyncThunk(
  'testlist/getSnPErrorDetailsPlatformsData',
  async (data, { rejectWithValue, getState }) => {
    try {
      const filters = getAllSnPTestFilters(getState());
      const response = await getSnPErrorDetailsPlatforms({ ...data, filters });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getSnPErrorDetailsErrorCountData = createAsyncThunk(
  'testlist/getSnPErrorDetailsErrorCountData',
  async (data, { rejectWithValue, getState }) => {
    try {
      const filters = getAllSnPTestFilters(getState());
      const response = await getSnPErrorDetailsErrorCount({ ...data, filters });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export default reducer;
