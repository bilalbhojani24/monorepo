import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createNewAlert,
  deleteAlert,
  getBuildNames,
  getSettingsByKey,
  updateSettingsByKey
} from 'api/settings';

import { getAlertsState, getBuildNamesState } from './selectors';

const SLICE_NAME = 'alertsSettings';

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
        data: response.data?.data || {},
        project: data?.projectNormalisedName
      };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const submitNewAlert = createAsyncThunk(
  `${SLICE_NAME}/submitNewAlert`,
  async (data, { rejectWithValue }) => {
    try {
      const response = await createNewAlert({ ...data });
      return {
        alertId: response.data?.id,
        alertData: data.payload || {}
      };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const updateAlert = createAsyncThunk(
  `${SLICE_NAME}/updateAlert`,
  async (data, { rejectWithValue }) => {
    try {
      await updateSettingsByKey('alerts', { ...data });
      return {
        alertData: data.payload || {}
      };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const deleteAlertById = createAsyncThunk(
  `${SLICE_NAME}/deleteAlertById`,
  async (data, { rejectWithValue }) => {
    try {
      await deleteAlert({ ...data });
      return {
        alertId: data.alertId,
        alertType: data.alertType
      };
    } catch (err) {
      return rejectWithValue(err);
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
      return rejectWithValue(err);
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
    alerts: {
      isLoading: true,
      project: '',
      data: {}
    }
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      .addCase(submitNewAlert.fulfilled, (state, { payload }) => {
        let updatedData = [
          {
            id: payload.alertId,
            ...payload.alertData
          }
        ];

        if (state.alerts.data?.[payload.alertData.alertType]?.length) {
          updatedData = [
            ...updatedData,
            ...state.alerts.data[payload.alertData.alertType]
          ];
        }
        state.alerts.data[payload.alertData.alertType] = updatedData;
      })
      .addCase(updateAlert.fulfilled, (state, { payload }) => {
        const foundAlertIdx = state.alerts.data[
          payload.alertData.alertType
        ].findIndex((item) => item.id === payload.alertData.id);
        if (foundAlertIdx !== -1) {
          state.alerts.data[payload.alertData.alertType][foundAlertIdx] =
            payload.alertData;
        }
      })
      .addCase(deleteAlertById.fulfilled, (state, { payload }) => {
        state.alerts.data[payload.alertType] = state.alerts.data[
          payload.alertType
        ].filter((item) => item.id !== payload.alertId);
        if (!state.alerts.data[payload.alertType].length) {
          delete state.alerts.data[payload.alertType];
        }
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
