import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getBuildNames,
  getSettingsByKey,
  updateSettingsByKey
} from 'api/settings';

import {
  getAlertsState,
  getAutoAnalyzerSettingsState,
  getBuildNamesState,
  getGeneralSettingsState,
  getReRunSettingsState
} from './selectors';

const SLICE_NAME = 'settings';

// General Settings
export const getGeneralSettingsData = createAsyncThunk(
  `${SLICE_NAME}/getGeneralSettingsData`,
  async (data, { rejectWithValue, getState }) => {
    const currentState = getGeneralSettingsState(getState());
    if (currentState.project === data.projectNormalisedName) {
      return currentState;
    }

    try {
      const response = await getSettingsByKey('general', { ...data });
      return {
        data: response.data,
        project: data?.projectNormalisedName
      };
    } catch (err) {
      return rejectWithValue({ err, data });
    }
  }
);
export const submitGeneralSettingsChanges = createAsyncThunk(
  `${SLICE_NAME}/submitGeneralSettingsChanges`,
  async (data, { rejectWithValue }) => {
    try {
      await updateSettingsByKey('general', { ...data });
      return {
        data: {
          buildTimeout: data.payload.buildTimeout
        },
        project: data?.projectNormalisedName
      };
    } catch (err) {
      return rejectWithValue({ err, data });
    }
  }
);

//  Auto analyzer Settings
export const getAutoAnalyserSettingsData = createAsyncThunk(
  `${SLICE_NAME}/getAutoAnalyserSettingsData`,
  async (data, { rejectWithValue, getState }) => {
    const currentState = getAutoAnalyzerSettingsState(getState());
    if (currentState.project === data.projectNormalisedName) {
      return currentState;
    }
    try {
      const response = await getSettingsByKey('auto-analyser', { ...data });
      return {
        data: response.data,
        project: data?.projectNormalisedName
      };
    } catch (err) {
      return rejectWithValue({ err, data });
    }
  }
);
export const updateAutoAnalyserSettingsData = createAsyncThunk(
  `${SLICE_NAME}/updateAutoAnalyserSettingsData`,
  async (data, { rejectWithValue }) => {
    try {
      await updateSettingsByKey('auto-analyser', { ...data });
      return {
        data: { ...data.payload },
        project: data?.projectNormalisedName
      };
    } catch (err) {
      return rejectWithValue({ err, data });
    }
  }
);

// Re-Run Settings
export const getReRunSettings = createAsyncThunk(
  `${SLICE_NAME}/getReRunSettings`,
  async (data, { rejectWithValue, getState }) => {
    const currentState = getReRunSettingsState(getState());
    if (currentState.project === data.projectNormalisedName) {
      return currentState;
    }
    try {
      const response = await getSettingsByKey('re-run', { ...data });
      return {
        data: response.data,
        project: data?.projectNormalisedName
      };
    } catch (err) {
      return rejectWithValue({ err, data });
    }
  }
);
export const updateReRunSettings = createAsyncThunk(
  `${SLICE_NAME}/updateReRunSettings`,
  async (data, { rejectWithValue }) => {
    try {
      await updateSettingsByKey('re-run', { ...data });
      return {
        data: { ...data.payload },
        project: data?.projectNormalisedName
      };
    } catch (err) {
      return rejectWithValue({ err, data });
    }
  }
);

// Alerts Settings
export const getAlertsSettings = createAsyncThunk(
  `${SLICE_NAME}/getAlertsSettings`,
  async (data, { rejectWithValue, getState }) => {
    const currentState = getAlertsState(getState());
    if (currentState.project === data.projectNormalisedName) {
      return currentState;
    }
    try {
      const response = await getSettingsByKey('alerts', { ...data });
      return {
        data: response.data?.data || null,
        project: data?.projectNormalisedName
      };
    } catch (err) {
      return rejectWithValue({ err, data });
    }
  }
);

// Build Names
export const getBuildNamesData = createAsyncThunk(
  `${SLICE_NAME}/getBuildNamesData`,
  async (data, { rejectWithValue, getState }) => {
    const currentState = getBuildNamesState(getState());
    if (currentState.project === data.projectNormalisedName) {
      return currentState;
    }
    try {
      const response = await getBuildNames({ ...data });
      return {
        data: response.data || null,
        project: data?.projectNormalisedName
      };
    } catch (err) {
      return rejectWithValue({ err, data });
    }
  }
);
const { reducer } = createSlice({
  name: SLICE_NAME,
  initialState: {
    buildNames: {
      isLoading: false,
      project: '',
      data: []
    },
    general: {
      isLoading: false,
      project: '',
      data: {}
    },
    autoFailureAnalysis: {
      isLoading: false,
      project: '',
      data: {
        failureCategoryDetectionEnabled: false,
        uniqueErrorDetectionEnabled: false,
        thresholdPercentage: 0
      }
    },
    reRun: {
      isLoading: false,
      project: '',
      data: {
        reRunViaCli: false,
        reRunViaDashboard: false
      }
    },
    alerts: {
      isLoading: true,
      project: '',
      data: null
    }
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // General Settings
      .addCase(getGeneralSettingsData.pending, (state) => {
        state.general.isLoading = true;
      })
      .addCase(getGeneralSettingsData.fulfilled, (state, { payload }) => {
        state.general = {
          ...state.general,
          ...payload,
          isLoading: false
        };
      })
      .addCase(getGeneralSettingsData.rejected, (state) => {
        state.general = {
          isLoading: false,
          project: '',
          data: {}
        };
      })
      .addCase(submitGeneralSettingsChanges.pending, (state) => {
        state.general.isLoading = true;
      })
      .addCase(submitGeneralSettingsChanges.rejected, (state) => {
        state.general.isLoading = false;
      })
      .addCase(submitGeneralSettingsChanges.fulfilled, (state, { payload }) => {
        state.general = {
          ...state.general,
          data: {
            ...state.general.data,
            ...payload.data
          },
          isLoading: false
        };
      })
      // Auto Analyzer Settings
      .addCase(getAutoAnalyserSettingsData.pending, (state) => {
        state.autoFailureAnalysis.isLoading = true;
      })
      .addCase(getAutoAnalyserSettingsData.fulfilled, (state, { payload }) => {
        state.autoFailureAnalysis = {
          ...state.autoFailureAnalysis,
          ...payload,
          isLoading: false
        };
      })
      .addCase(getAutoAnalyserSettingsData.rejected, (state) => {
        state.autoFailureAnalysis = {
          isLoading: false,
          project: '',
          data: {}
        };
      })
      .addCase(updateAutoAnalyserSettingsData.pending, (state) => {
        state.autoFailureAnalysis.isLoading = true;
      })
      .addCase(updateAutoAnalyserSettingsData.rejected, (state) => {
        state.autoFailureAnalysis.isLoading = false;
      })
      .addCase(
        updateAutoAnalyserSettingsData.fulfilled,
        (state, { payload }) => {
          state.autoFailureAnalysis = {
            ...state.autoFailureAnalysis,
            data: {
              ...state.autoFailureAnalysis.data,
              ...payload.data
            },
            isLoading: false
          };
        }
      )
      // Re-Run Settings
      .addCase(getReRunSettings.pending, (state) => {
        state.reRun.isLoading = true;
      })
      .addCase(getReRunSettings.fulfilled, (state, { payload }) => {
        state.reRun = {
          ...state.reRun,
          ...payload,
          isLoading: false
        };
      })
      .addCase(getReRunSettings.rejected, (state) => {
        state.reRun = {
          isLoading: false,
          project: '',
          data: {}
        };
      })
      .addCase(updateReRunSettings.pending, (state) => {
        state.reRun.isLoading = true;
      })
      .addCase(updateReRunSettings.rejected, (state) => {
        state.reRun.isLoading = false;
      })
      .addCase(updateReRunSettings.fulfilled, (state, { payload }) => {
        state.reRun = {
          ...state.reRun,
          data: {
            ...state.reRun.data,
            ...payload.data
          },
          isLoading: false
        };
      })
      // Alerts Settings
      .addCase(getAlertsSettings.pending, (state) => {
        state.alerts.isLoading = true;
      })
      .addCase(getAlertsSettings.fulfilled, (state, { payload }) => {
        state.alerts = {
          ...state.alerts,
          ...payload,
          isLoading: false
        };
      })
      .addCase(getAlertsSettings.rejected, (state) => {
        state.alerts = {
          isLoading: false,
          project: '',
          data: {}
        };
      })
      // Build Names
      .addCase(getBuildNamesData.pending, (state) => {
        state.buildNames.isLoading = true;
      })
      .addCase(getBuildNamesData.fulfilled, (state, { payload }) => {
        state.buildNames = {
          ...state.buildNames,
          ...payload,
          isLoading: false
        };
      })
      .addCase(getBuildNamesData.rejected, (state) => {
        state.buildNames = {
          isLoading: false,
          project: '',
          data: []
        };
      });
  }
});

export default reducer;
