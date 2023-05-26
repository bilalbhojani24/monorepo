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

export const getAlwaysFailingData = createAsyncThunk(
  'insights/getAlwaysFailingData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getAlwaysFailingStats(data.buildId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
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
      return rejectWithValue(err);
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
      return rejectWithValue(err);
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
      return rejectWithValue(err);
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
      return rejectWithValue(err);
    }
  }
);

export const getBuildSummaryData = createAsyncThunk(
  'insights/getBuildSummaryData',
  async (data, { rejectWithValue, signal }) => {
    try {
      const response = await getBuildSummaryStats(data.buildId, signal);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
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
      return rejectWithValue(err);
    }
  }
);

/* Failure Categories specific */

export const getBuildHistoryData = createAsyncThunk(
  'insights/getBuildHistoryData',
  async (data, { rejectWithValue, signal }) => {
    try {
      const response = await getBuildHistoryStats(data.buildId, signal);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
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
      return rejectWithValue(err);
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
      return rejectWithValue(err);
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
      return rejectWithValue(err);
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
      return rejectWithValue(err);
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
      return rejectWithValue(err);
    }
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(getAlwaysFailingData.pending, (state) => {
        state.alwaysFailing.isLoading = true;
        state.alwaysFailing.hasNetworkError = false;
      })
      .addCase(getAlwaysFailingData.rejected, (state) => {
        state.alwaysFailing.isLoading = false;
        state.alwaysFailing.hasNetworkError = true;
      })
      .addCase(getAlwaysFailingData.fulfilled, (state, { payload }) => {
        state.alwaysFailing = {
          data: payload,
          isLoading: false,
          hasNetworkError: false
        };
      })
      .addCase(getNewFailureData.pending, (state) => {
        state.newFailure.isLoading = true;
        state.newFailure.hasNetworkError = false;
      })
      .addCase(getNewFailureData.rejected, (state) => {
        state.newFailure.isLoading = false;
        state.newFailure.hasNetworkError = true;
      })
      .addCase(getNewFailureData.fulfilled, (state, { payload }) => {
        state.newFailure = {
          data: payload,
          isLoading: false,
          hasNetworkError: false
        };
      })
      .addCase(getMutedData.pending, (state) => {
        state.mutedTests.isLoading = true;
        state.mutedTests.hasNetworkError = false;
      })
      .addCase(getMutedData.rejected, (state) => {
        state.mutedTests.isLoading = false;
        state.mutedTests.hasNetworkError = true;
      })
      .addCase(getMutedData.fulfilled, (state, { payload }) => {
        state.mutedTests = {
          data: payload,
          isLoading: false,
          hasNetworkError: false
        };
      })
      .addCase(getFlakyData.pending, (state) => {
        state.flakiness.isLoading = true;
        state.flakiness.hasNetworkError = false;
      })
      .addCase(getFlakyData.rejected, (state) => {
        state.flakiness.isLoading = false;
        state.flakiness.hasNetworkError = true;
      })
      .addCase(getFlakyData.fulfilled, (state, { payload }) => {
        state.flakiness = {
          data: payload,
          isLoading: false,
          hasNetworkError: false
        };
      })
      .addCase(getDefectsData.pending, (state) => {
        state.defects.isLoading = true;
        state.defects.hasNetworkError = false;
      })
      .addCase(getDefectsData.rejected, (state) => {
        state.defects.isLoading = false;
        state.defects.hasNetworkError = true;
      })
      .addCase(getDefectsData.fulfilled, (state, { payload }) => {
        state.defects = {
          data: payload,
          isLoading: false,
          hasNetworkError: false
        };
      })
      .addCase(getBuildSummaryData.pending, (state, payload) => {
        state.buildSummary.isLoading = !payload.meta.arg?.fetchUpdate;
        state.buildSummary.hasNetworkError = false;
      })
      .addCase(getBuildSummaryData.rejected, (state, payload) => {
        if (payload?.error?.name !== 'AbortError') {
          state.buildSummary.isLoading = false;
          state.buildSummary.hasNetworkError = true;
        }
      })
      .addCase(getBuildSummaryData.fulfilled, (state, { payload }) => {
        state.buildSummary = {
          data: payload,
          isLoading: false,
          hasNetworkError: false
        };
      })
      .addCase(getFailureByModulesData.pending, (state) => {
        state.failureByModules.isLoading = true;
        state.failureByModules.hasNetworkError = false;
      })
      .addCase(getFailureByModulesData.rejected, (state) => {
        state.failureByModules.isLoading = false;
        state.failureByModules.hasNetworkError = true;
      })
      .addCase(getFailureByModulesData.fulfilled, (state, { payload }) => {
        state.failureByModules = {
          data: payload.data,
          isLoading: false,
          hasNetworkError: false
        };
      })
      .addCase(getBuildHistoryData.pending, (state, payload) => {
        state.buildHistory.isLoading = !payload.meta.arg?.fetchUpdate;
        state.buildHistory.hasNetworkError = false;
      })
      .addCase(getBuildHistoryData.rejected, (state, payload) => {
        if (payload?.error?.name !== 'AbortError') {
          state.buildHistory.isLoading = false;
          state.buildHistory.hasNetworkError = true;
        }
      })
      .addCase(getBuildHistoryData.fulfilled, (state, { payload }) => {
        state.buildHistory = {
          data: payload.data,
          keys: payload.keys || [],
          isLoading: false,
          hasNetworkError: false
        };
      })
      .addCase(getBuildStabilityData.pending, (state) => {
        state.buildStability.isLoading = true;
        state.buildStability.hasNetworkError = false;
      })
      .addCase(getBuildStabilityData.rejected, (state) => {
        state.buildStability.isLoading = false;
        state.buildStability.hasNetworkError = true;
      })
      .addCase(getBuildStabilityData.fulfilled, (state, { payload }) => {
        state.buildStability = {
          data: payload,
          isLoading: false,
          hasNetworkError: false
        };
      })
      .addCase(getBuildAlertsData.pending, (state) => {
        state.buildAlerts.isLoading = true;
        state.buildAlerts.hasNetworkError = false;
      })
      .addCase(getBuildAlertsData.rejected, (state) => {
        state.buildAlerts.isLoading = false;
        state.buildAlerts.hasNetworkError = true;
      })
      .addCase(getBuildAlertsData.fulfilled, (state, { payload }) => {
        state.buildAlerts = {
          data: payload,
          isLoading: false,
          hasNetworkError: false
        };
      })
      .addCase(getRerunData.pending, (state) => {
        state.reRunSummary.isLoading = true;
        state.reRunSummary.hasNetworkError = false;
      })
      .addCase(getRerunData.rejected, (state) => {
        state.reRunSummary.isLoading = false;
        state.reRunSummary.hasNetworkError = true;
      })
      .addCase(getRerunData.fulfilled, (state, { payload }) => {
        state.reRunSummary = {
          data: payload,
          isLoading: false,
          hasNetworkError: false
        };
      })
      .addCase(getBuildTimelineData.pending, (state) => {
        state.buildTimeline.isLoading = true;
        state.buildTimeline.hasNetworkError = false;
      })
      .addCase(getBuildTimelineData.rejected, (state) => {
        state.buildTimeline.isLoading = false;
        state.buildTimeline.hasNetworkError = true;
      })
      .addCase(getBuildTimelineData.fulfilled, (state, { payload }) => {
        state.buildTimeline = {
          data: payload.data,
          isLoading: false,
          hasNetworkError: false
        };
      })
      .addCase(getTopErrorsData.pending, (state) => {
        state.topErrors.isLoading = true;
        state.topErrors.hasNetworkError = false;
      })
      .addCase(getTopErrorsData.rejected, (state) => {
        state.topErrors.isLoading = false;
        state.topErrors.hasNetworkError = true;
      })
      .addCase(getTopErrorsData.fulfilled, (state, { payload }) => {
        state.topErrors = {
          data: payload,
          isLoading: false,
          hasNetworkError: false
        };
      });
  }
});

export const { setTopErrorsTestRuns, updateBuildHistory, updateBuildSummary } =
  actions;

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
      return rejectWithValue(err);
    }
  }
);

export default reducer;
