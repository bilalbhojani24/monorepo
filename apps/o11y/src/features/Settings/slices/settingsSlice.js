import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getAutoAnalyserSettings,
  getGeneralSettings,
  updateAutoAnalyserSettings,
  updateGeneralSettings
} from 'api/settings';

import {
  getAutoAnalyzerSettingsState,
  getGeneralSettingsState
} from './selectors';

const SLICE_NAME = 'settings';

export const getGeneralSettingsData = createAsyncThunk(
  `${SLICE_NAME}/getGeneralSettingsData`,
  async (data, { rejectWithValue, getState }) => {
    const currentState = getGeneralSettingsState(getState());
    if (currentState.project === data.projectNormalisedName) {
      return currentState;
    }

    try {
      const response = await getGeneralSettings({ ...data });
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
      await updateGeneralSettings({ ...data });
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

export const getAutoAnalyserSettingsData = createAsyncThunk(
  `${SLICE_NAME}/getAutoAnalyserSettingsData`,
  async (data, { rejectWithValue, getState }) => {
    const currentState = getAutoAnalyzerSettingsState(getState());
    if (currentState.project === data.projectNormalisedName) {
      return currentState;
    }
    try {
      const response = await getAutoAnalyserSettings({ ...data });
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
      await updateAutoAnalyserSettings({ ...data });
      return {
        data: { ...data.payload },
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
    }
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      );
  }
});

export default reducer;
