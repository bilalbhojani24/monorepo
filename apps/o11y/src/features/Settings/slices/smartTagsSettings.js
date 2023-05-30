import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getSettingsByKey, updateSettingsByKey } from 'api/settings';
import { o11yNotify } from 'utils/notification';

import { getSmartTagsSettings } from './selectors';

const SLICE_NAME = 'smartTagsSettings';

// Smart Tags Settings
export const getSmartTags = createAsyncThunk(
  `${SLICE_NAME}/getSmartTags`,
  async (data, { rejectWithValue }) => {
    try {
      const response = await getSettingsByKey('smartTags', { ...data });
      return {
        data: response.data,
        localState: response.data,
        project: data?.projectNormalisedName
      };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const submitSmartTagsChanges = createAsyncThunk(
  `${SLICE_NAME}/submitSmartTagsChanges`,
  async (data, { rejectWithValue, getState }) => {
    const currentState = getSmartTagsSettings(getState());
    try {
      await updateSettingsByKey('smartTags', {
        ...data,
        payload: currentState.localState
      });
      return { data: currentState.localState };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const { reducer, actions } = createSlice({
  name: SLICE_NAME,
  initialState: {
    smartTags: {
      isLoading: true,
      project: '',
      data: {},
      localState: {}
    }
  },
  reducers: {
    saveSmartTagsChanges: (state, { payload }) => {
      state.smartTags.localState = {
        ...state.smartTags.localState,
        ...payload
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSmartTags.pending, (state) => {
        state.smartTags.isLoading = true;
      })
      .addCase(getSmartTags.fulfilled, (state, { payload }) => {
        state.smartTags = {
          ...state.smartTags,
          ...payload,
          isLoading: false
        };
      })
      .addCase(getSmartTags.rejected, (state) => {
        state.smartTags = {
          isLoading: false,
          project: '',
          data: {},
          localState: {}
        };
      })
      .addCase(submitSmartTagsChanges.pending, (state) => {
        state.smartTags.isLoading = true;
      })
      .addCase(submitSmartTagsChanges.rejected, (state) => {
        state.smartTags.isLoading = false;
        state.smartTags = {
          ...state.smartTags,
          localState: {
            ...state.smartTags.data
          },
          isLoading: false
        };
        o11yNotify({
          type: 'error',
          title: 'Something went wrong',
          description: 'We were unable to update settings. Please try again'
        });
      })
      .addCase(submitSmartTagsChanges.fulfilled, (state, { payload }) => {
        state.smartTags = {
          ...state.smartTags,
          data: {
            ...payload.data
          },
          isLoading: false
        };
        o11yNotify({
          type: 'success',
          title: 'Settings updated successfully'
        });
      });
  }
});

export const { saveSmartTagsChanges } = actions;

export default reducer;
