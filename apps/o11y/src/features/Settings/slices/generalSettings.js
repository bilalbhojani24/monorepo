import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getSettingsByKey, updateSettingsByKey } from 'api/settings';

import { getGeneralSettingsState } from './selectors';

const SLICE_NAME = 'generalSettings';

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

const { reducer } = createSlice({
  name: SLICE_NAME,
  initialState: {
    general: {
      isLoading: false,
      project: '',
      data: {}
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
      });
  }
});

export default reducer;
