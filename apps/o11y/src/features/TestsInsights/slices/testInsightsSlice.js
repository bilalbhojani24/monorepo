import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getAlwaysFailingStats,
  getBuildAlerts,
  getBuildHistoryStats,
  getBuildStabilityStats,
  getBuildSummaryStats,
  getBuildTimelineStats,
  getDefectStats,
  getFailureByModules,
  getFlakyStats,
  getMutedStats,
  getNewFailureStats,
  getRerunStats,
  getTopErrorsStats,
  getTopErrorsTestRuns
} from 'api/insights';

const { reducer, actions } = createSlice({
  name: 'insights',
  initialState: {
    alwaysFailing: {
      isLoading: false,
      hasNetworkError: false,
      data: {}
    },
    newFailure: {
      isLoading: false,
      hasNetworkError: false,
      data: {}
    },
    mutedTests: {
      isLoading: false,
      hasNetworkError: false,
      data: {}
    },
    flakiness: {
      isLoading: false,
      hasNetworkError: false,
      data: {}
    },
    defects: {
      isLoading: false,
      hasNetworkError: false,
      data: []
    },
    buildSummary: {
      isLoading: false,
      hasNetworkError: false,
      data: []
    },
    failureByModules: {
      isLoading: false,
      hasNetworkError: false,
      data: []
    },
    buildHistory: {
      isLoading: false,
      hasNetworkError: false,
      data: [],
      keys: []
    },
    buildStability: {
      isLoading: false,
      hasNetworkError: false,
      data: {}
    },
    buildAlerts: {
      isLoading: false,
      hasNetworkError: false,
      data: []
    },
    reRunSummary: {
      isLoading: false,
      hasNetworkError: false,
      data: {}
    },
    buildTimeline: {
      isLoading: false,
      hasNetworkError: false,
      data: {}
    },
    topErrors: {
      isLoading: false,
      hasNetworkError: false,
      data: {}
    }
  },
  reducers: {
    setTopErrorsTestRuns: (state, { payload }) => {
      const statToUpdate = state.topErrors.data?.data?.findIndex(
        (item) => item.id === payload.id
      );
      if (statToUpdate !== -1) {
        state.topErrors.data.data[statToUpdate].testRuns = payload.testRuns;
      }
    },
    updateBuildSummary: (state, { payload }) => {
      state.buildSummary = {
        data: payload,
        isLoading: false,
        hasNetworkError: false
      };
    },
    updateBuildHistory: (state, { payload }) => {
      state.buildHistory = {
        data: payload.data,
        keys: payload.keys || [],
        isLoading: false,
        hasNetworkError: false
      };
    }
  },
  extraReducers: {
    'insights/getAlwaysFailingData/pending': (state) => {
      state.alwaysFailing.isLoading = true;
      state.alwaysFailing.hasNetworkError = false;
    },
    'insights/getAlwaysFailingData/rejected': (state) => {
      state.alwaysFailing.isLoading = false;
      state.alwaysFailing.hasNetworkError = true;
    },
    'insights/getAlwaysFailingData/fulfilled': (state, { payload }) => {
      state.alwaysFailing = {
        data: payload,
        isLoading: false,
        hasNetworkError: false
      };
    },
    'insights/getNewFailureData/pending': (state) => {
      state.newFailure.isLoading = true;
      state.newFailure.hasNetworkError = false;
    },
    'insights/getNewFailureData/rejected': (state) => {
      state.newFailure.isLoading = false;
      state.newFailure.hasNetworkError = true;
    },
    'insights/getNewFailureData/fulfilled': (state, { payload }) => {
      state.newFailure = {
        data: payload,
        isLoading: false,
        hasNetworkError: false
      };
    },
    'insights/getMutedData/pending': (state) => {
      state.mutedTests.isLoading = true;
      state.mutedTests.hasNetworkError = false;
    },
    'insights/getMutedData/rejected': (state) => {
      state.mutedTests.isLoading = false;
      state.mutedTests.hasNetworkError = true;
    },
    'insights/getMutedData/fulfilled': (state, { payload }) => {
      state.mutedTests = {
        data: payload,
        isLoading: false,
        hasNetworkError: false
      };
    },
    'insights/getFlakyData/pending': (state) => {
      state.flakiness.isLoading = true;
      state.flakiness.hasNetworkError = false;
    },
    'insights/getFlakyData/rejected': (state) => {
      state.flakiness.isLoading = false;
      state.flakiness.hasNetworkError = true;
    },
    'insights/getFlakyData/fulfilled': (state, { payload }) => {
      state.flakiness = {
        data: payload,
        isLoading: false,
        hasNetworkError: false
      };
    },
    'insights/getDefectsData/pending': (state) => {
      state.defects.isLoading = true;
      state.defects.hasNetworkError = false;
    },
    'insights/getDefectsData/rejected': (state) => {
      state.defects.isLoading = false;
      state.defects.hasNetworkError = true;
    },
    'insights/getDefectsData/fulfilled': (state, { payload }) => {
      state.defects = {
        data: payload,
        isLoading: false,
        hasNetworkError: false
      };
    },
    'insights/getBuildSummaryData/pending': (state, payload) => {
      state.buildSummary.isLoading = !payload.meta.arg?.fetchUpdate;
      state.buildSummary.hasNetworkError = false;
    },
    'insights/getBuildSummaryData/rejected': (state) => {
      state.buildSummary.isLoading = false;
      state.buildSummary.hasNetworkError = true;
    },
    'insights/getBuildSummaryData/fulfilled': (state, { payload }) => {
      state.buildSummary = {
        data: payload,
        isLoading: false,
        hasNetworkError: false
      };
    },
    'insights/getFailureByModulesData/pending': (state) => {
      state.failureByModules.isLoading = true;
      state.failureByModules.hasNetworkError = false;
    },
    'insights/getFailureByModulesData/rejected': (state) => {
      state.failureByModules.isLoading = false;
      state.failureByModules.hasNetworkError = true;
    },
    'insights/getFailureByModulesData/fulfilled': (state, { payload }) => {
      state.failureByModules = {
        data: payload.data,
        isLoading: false,
        hasNetworkError: false
      };
    },
    'insights/getBuildHistoryData/pending': (state, payload) => {
      state.buildHistory.isLoading = !payload.meta.arg?.fetchUpdate;
      state.buildHistory.hasNetworkError = false;
    },
    'insights/getBuildHistoryData/rejected': (state) => {
      state.buildHistory.isLoading = false;
      state.buildHistory.hasNetworkError = true;
    },
    'insights/getBuildHistoryData/fulfilled': (state, { payload }) => {
      state.buildHistory = {
        data: payload.data,
        keys: payload.keys || [],
        isLoading: false,
        hasNetworkError: false
      };
    },
    'insights/getBuildStabilityData/pending': (state) => {
      state.buildStability.isLoading = true;
      state.buildStability.hasNetworkError = false;
    },
    'insights/getBuildStabilityData/rejected': (state) => {
      state.buildStability.isLoading = false;
      state.buildStability.hasNetworkError = true;
    },
    'insights/getBuildStabilityData/fulfilled': (state, { payload }) => {
      state.buildStability = {
        data: payload,
        isLoading: false,
        hasNetworkError: false
      };
    },
    'insights/getBuildAlertsData/pending': (state) => {
      state.buildAlerts.isLoading = true;
      state.buildAlerts.hasNetworkError = false;
    },
    'insights/getBuildAlertsData/rejected': (state) => {
      state.buildAlerts.isLoading = false;
      state.buildAlerts.hasNetworkError = true;
    },
    'insights/getBuildAlertsData/fulfilled': (state, { payload }) => {
      state.buildAlerts = {
        data: payload,
        isLoading: false,
        hasNetworkError: false
      };
    },
    'insights/getRerunData/pending': (state) => {
      state.reRunSummary.isLoading = true;
      state.reRunSummary.hasNetworkError = false;
    },
    'insights/getRerunData/rejected': (state) => {
      state.reRunSummary.isLoading = false;
      state.reRunSummary.hasNetworkError = true;
    },
    'insights/getRerunData/fulfilled': (state, { payload }) => {
      state.reRunSummary = {
        data: payload,
        isLoading: false,
        hasNetworkError: false
      };
    },
    'insights/getBuildTimelineData/pending': (state) => {
      state.buildTimeline.isLoading = true;
      state.buildTimeline.hasNetworkError = false;
    },
    'insights/getBuildTimelineData/rejected': (state) => {
      state.buildTimeline.isLoading = false;
      state.buildTimeline.hasNetworkError = true;
    },
    'insights/getBuildTimelineData/fulfilled': (state, { payload }) => {
      state.buildTimeline = {
        data: payload.data,
        isLoading: false,
        hasNetworkError: false
      };
    },
    'insights/getTopErrorsData/pending': (state) => {
      state.topErrors.isLoading = true;
      state.topErrors.hasNetworkError = false;
    },
    'insights/getTopErrorsData/rejected': (state) => {
      state.topErrors.isLoading = false;
      state.topErrors.hasNetworkError = true;
    },
    'insights/getTopErrorsData/fulfilled': (state, { payload }) => {
      state.topErrors = {
        data: payload,
        isLoading: false,
        hasNetworkError: false
      };
    }
  }
});

export const { setTopErrorsTestRuns, updateBuildHistory, updateBuildSummary } =
  actions;

export const getAlwaysFailingData = createAsyncThunk(
  'insights/getAlwaysFailingData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getAlwaysFailingStats(data.buildId);
      return response.data;
    } catch (err) {
      return rejectWithValue({ err, data });
    }
  }
);

export const getNewFailureData = createAsyncThunk(
  'insights/getNewFailureData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getNewFailureStats(data.buildId);
      return response.data;
    } catch (err) {
      return rejectWithValue({ err, data });
    }
  }
);

export const getMutedData = createAsyncThunk(
  'insights/getMutedData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getMutedStats(data.buildId);
      return response.data;
    } catch (err) {
      return rejectWithValue({ err, data });
    }
  }
);

export const getFlakyData = createAsyncThunk(
  'insights/getFlakyData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getFlakyStats(data.buildId);
      return response.data;
    } catch (err) {
      return rejectWithValue({ err, data });
    }
  }
);

export const getDefectsData = createAsyncThunk(
  'insights/getDefectsData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getDefectStats(data.buildId);
      return response.data;
    } catch (err) {
      return rejectWithValue({ err, data });
    }
  }
);

export const getBuildSummaryData = createAsyncThunk(
  'insights/getBuildSummaryData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getBuildSummaryStats(data.buildId);
      return response.data;
    } catch (err) {
      return rejectWithValue({ err, data });
    }
  }
);

export const getFailureByModulesData = createAsyncThunk(
  'insights/getFailureByModulesData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getFailureByModules(data.buildId);
      return response.data;
    } catch (err) {
      return rejectWithValue({ err, data });
    }
  }
);

/* Failure Categories specific */

export const getBuildHistoryData = createAsyncThunk(
  'insights/getBuildHistoryData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getBuildHistoryStats(data.buildId);
      return response.data;
    } catch (err) {
      return rejectWithValue({ err, data });
    }
  }
);
export const getBuildStabilityData = createAsyncThunk(
  'insights/getBuildStabilityData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getBuildStabilityStats(data.buildId);
      return response.data;
    } catch (err) {
      return rejectWithValue({ err, data });
    }
  }
);
export const getBuildAlertsData = createAsyncThunk(
  'insights/getBuildAlertsData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getBuildAlerts(data.buildId);
      return response.data;
    } catch (err) {
      return rejectWithValue({ err, data });
    }
  }
);
export const getRerunData = createAsyncThunk(
  'insights/getRerunData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getRerunStats(data.buildId);
      return response.data;
    } catch (err) {
      return rejectWithValue({ err, data });
    }
  }
);
export const getBuildTimelineData = createAsyncThunk(
  'insights/getBuildTimelineData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getBuildTimelineStats(data.buildId);
      return response.data;
    } catch (err) {
      return rejectWithValue({ err, data });
    }
  }
);
export const getTopErrorsData = createAsyncThunk(
  'insights/getTopErrorsData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getTopErrorsStats(data.buildId);
      return response.data;
    } catch (err) {
      return rejectWithValue({ err, data });
    }
  }
);
export const getTopErrorsTestRunsData = createAsyncThunk(
  'insights/getTopErrorsTestRunsData',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await getTopErrorsTestRuns(data.buildId, data.statId);
      dispatch(
        setTopErrorsTestRuns({
          id: data.statId,
          testRuns: response.data.testRuns
        })
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({ err, data });
    }
  }
);

export default reducer;
