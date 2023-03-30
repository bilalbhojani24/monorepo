import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getSettingsByKey, updateSettingsByKey } from 'api/settings';

import { getReRunSettingsState } from './selectors';

const SLICE_NAME = 'reRunSettings';

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

const { reducer } = createSlice({
  name: SLICE_NAME,
  initialState: {
    reRun: {
      isLoading: false,
      project: '',
      data: {
        reRunViaCli: false,
        reRunViaDashboard: false
      }
    }
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

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
      });
  }
});

export default reducer;
