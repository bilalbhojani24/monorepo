import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getBuildNames,
  getTrendBuildFrequency,
  getTrendFailureCategories,
  getTrendPerformance,
  getTrendPerformanceChart,
  getTrendsDataAPI,
  getTrendStability,
  getTrendStabilityChart,
  getTrendUniqueBuilds
} from 'api/testingTrend';
import { TT_PARAMS_MAPPING } from 'features/TestingTrends/constants';

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
export const getTrendStabilityData = createAsyncThunk(
  'testlist/getTrendStabilityData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getTrendStability({ ...data });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const getTrendStabilityChartData = createAsyncThunk(
  'testlist/getTrendStabilityChartData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getTrendStabilityChart({ ...data });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const getTrendPerformanceData = createAsyncThunk(
  'testlist/getTrendPerformanceData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getTrendPerformance({ ...data });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const getTrendPerformanceChartData = createAsyncThunk(
  'testlist/getTrendPerformanceChartData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getTrendPerformanceChart({ ...data });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getTrendUniqueBuildsData = createAsyncThunk(
  'testlist/getTrendUniqueBuildsData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getTrendUniqueBuilds({ ...data });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getTrendFailureCategoriesData = createAsyncThunk(
  'testlist/getTrendFailureCategoriesData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getTrendFailureCategories({ ...data });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const getTrendBuildFrequencyData = createAsyncThunk(
  'testlist/getTrendBuildFrequencyData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getTrendBuildFrequency({ ...data });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const getTrendsData = createAsyncThunk(
  'testlist/getTrendsData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getTrendsDataAPI({ ...data });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const getInitialDateRange = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const dateRange = searchParams.get(TT_PARAMS_MAPPING.ttDateRange) || 'days7';
  const dateTo = searchParams.get(TT_PARAMS_MAPPING.ttToDate);
  const dateFrom = searchParams.get(TT_PARAMS_MAPPING.ttFromDate);
  let returnData = {
    key: dateRange
  };
  if (dateRange !== 'custom') {
    returnData = {
      ...returnData
    };
  }
  if (dateRange === 'custom' && dateTo && dateFrom) {
    returnData = {
      ...returnData,
      upperBound: parseInt(dateTo, 10),
      lowerBound: parseInt(dateFrom, 10)
    };
  }
  return returnData;
};

const getInitialBuild = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const ttActiveBuild = searchParams.get(TT_PARAMS_MAPPING.ttActiveBuild);
  if (ttActiveBuild && ttActiveBuild !== 'all') {
    return {
      label: ttActiveBuild,
      value: ttActiveBuild
    };
  }
  return {
    label: 'All Builds',
    value: 'all'
  };
};

const { actions, reducer } = createSlice({
  name: 'testingTrends',
  initialState: {
    ttFilters: {
      dateRange: getInitialDateRange(),
      buildName: getInitialBuild(),
      prevDateRange: {
        key: '',
        upperBound: 0,
        lowerBound: 0
      }
    }
  },
  reducers: {
    setTTFilters: (state, { payload }) => {
      state.ttFilters = {
        ...state.ttFilters,
        ...payload
      };
    },
    clearTTFilter: (state) => {
      state.ttFilters = {
        dateRange: {
          key: 'days7'
        },
        buildName: {
          label: 'All Builds',
          value: 'all'
        }
      };
    }
  },
  extraReducers: {}
});

export const { setTTFilters, clearTTFilter } = actions;

export default reducer;
