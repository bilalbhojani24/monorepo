import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getBuildNames,
  getSnPTestsAverageFailureRatesMetrics,
  getSnPTestsAvergeDurationMetrics,
  getSnPTestsFailuresMetrics,
  getSnPTotalImpactedTestsMetrics,
  getSnPUETotalUniqueErrorsMetrics,
  getSnPUEUniqueImpactedTestsMetrics
} from 'api/snp';
import { SNP_PARAMS_MAPPING } from 'constants/common';

import { TABS } from '../constants';

const getInitialDateRange = () => {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(SNP_PARAMS_MAPPING.snpDateRange) || 'days7';
};

const getInitialActiveTab = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const tabVal = searchParams.get(SNP_PARAMS_MAPPING.snpTab);
  if (!tabVal) {
    return {
      idx: 0,
      value: TABS.tests
    };
  }
  const foundTabIdx = Object.keys(TABS).findIndex((item) => item === tabVal);
  if (foundTabIdx !== -1) {
    return {
      idx: foundTabIdx,
      value: TABS[tabVal]
    };
  }
  return {
    idx: 0,
    value: TABS.tests
  };
};

const getInitialBuild = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const snpActiveBuild = searchParams.get(SNP_PARAMS_MAPPING.snpActiveBuild);
  if (snpActiveBuild && snpActiveBuild !== 'all') {
    return snpActiveBuild.split(',').map((build) => build);
  }
  return [];
};
const getInitialMuted = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const snpIsMuted = searchParams.get(SNP_PARAMS_MAPPING.snpIsMuted);
  return snpIsMuted ? snpIsMuted === 'true' : false;
};
const getInitialFlaky = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const snpIsFlaky = searchParams.get(SNP_PARAMS_MAPPING.snpIsFlaky);
  return snpIsFlaky ? snpIsFlaky === 'true' : false;
};

const { reducer, actions } = createSlice({
  name: 'snp ui',
  initialState: {
    snpTestFilters: {
      dateRange: {
        key: getInitialDateRange()
      },
      buildName: getInitialBuild(),
      isMuted: getInitialMuted(),
      isFlaky: getInitialFlaky()
    },
    activeTab: getInitialActiveTab()
  },
  reducers: {
    setActiveTab: (state, { payload }) => {
      state.activeTab = payload;
    },
    setSnPTestFilters: (state, { payload }) => {
      state.snpTestFilters = {
        ...state.snpTestFilters,
        ...payload
      };
    },
    clearSnpTestFilter: (state) => {
      state.snpTestFilters = {
        dateRange: {
          key: 'days7'
        },
        buildName: [],
        isMuted: false,
        isFlaky: false
      };
    }
  },
  extraReducers: {}
});

export const { setSnPTestFilters, clearSnpTestFilter, setActiveTab } = actions;

export const getBuildNamesData = createAsyncThunk(
  'testlist/getBuildNamesData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getBuildNames({ ...data });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getSnPTestsFailuresMetricsData = createAsyncThunk(
  'snptests/FailureMetrics',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getSnPTestsFailuresMetrics({ ...data });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getSnPTestsAverageFailureRatesMetricsData = createAsyncThunk(
  'snptests/AverageFailureRates',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getSnPTestsAverageFailureRatesMetrics({ ...data });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getSnPTestsAvergeDurationMetricsData = createAsyncThunk(
  'snptests/AverageDurationMetrics',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getSnPTestsAvergeDurationMetrics({ ...data });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getSnPUETotalUniqueErrorsMetricsData = createAsyncThunk(
  'snpue/FailureMetrics',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getSnPUETotalUniqueErrorsMetrics({ ...data });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getSnPUEUniqueImpactedTestsMetricsData = createAsyncThunk(
  'snpue/AverageFailureRates',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getSnPUEUniqueImpactedTestsMetrics({ ...data });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getSnPTotalImpactedTestsMetricsData = createAsyncThunk(
  'snpue/AverageDurationMetrics',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getSnPTotalImpactedTestsMetrics({ ...data });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export default reducer;
