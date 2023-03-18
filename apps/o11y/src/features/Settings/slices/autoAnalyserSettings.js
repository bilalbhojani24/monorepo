import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getSettingsByKey, updateSettingsByKey } from 'api/settings';

import { getAutoAnalyzerSettingsState } from './selectors';

const SLICE_NAME = 'autoAnalyserSettings';

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

const { reducer } = createSlice({
  name: SLICE_NAME,
  initialState: {
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
