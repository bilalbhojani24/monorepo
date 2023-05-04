import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getSettingsByKey, updateSettingsByKey } from 'api/settings';

import { getSmartTagsSettings } from './selectors';

const SLICE_NAME = 'smartTagsSettings';

// Smart Tags Settings
export const getSmartTags = createAsyncThunk(
  `${SLICE_NAME}/getSmartTags`,
  async (data, { rejectWithValue }) => {
    try {
      const response = await getSettingsByKey('smart-tags', { ...data });
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
      await updateSettingsByKey('smart-tags', { ...data });
      return {
        ...currentState,
        data: { ...currentState.data, ...data }
      };
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
      })
      .addCase(submitSmartTagsChanges.fulfilled, (state, { payload }) => {
        state.smartTags = {
          ...state.smartTags,
          data: {
            ...payload.data
          },
          localState: {
            ...state.smartTags.localState,
            ...payload.data
          },
          isLoading: false
        };
      });
  }
});

export const { saveSmartTagsChanges } = actions;

export default reducer;
