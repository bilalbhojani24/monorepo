import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getBuildIdFromBuildInfoApi, getBuildMetaDataAPI } from 'api/builds';

import { TABS } from '../constants';

const SLICE_NAME = 'buildDetails';

export const getBuildIdFromBuildInfo = createAsyncThunk(
  `${SLICE_NAME}/getBuildIdFromBuildInfo`,
  async (data, { rejectWithValue }) => {
    try {
      const response = await getBuildIdFromBuildInfoApi({ ...data });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getBuildMetaData = createAsyncThunk(
  `${SLICE_NAME}/getBuildMetaData`,
  async (data, { rejectWithValue }) => {
    try {
      const response = await getBuildMetaDataAPI({ ...data });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const { reducer, actions } = createSlice({
  name: SLICE_NAME,
  initialState: {
    buildMeta: {
      isLoading: false,
      data: {}
    },
    buildUUID: '',
    activeTab: {
      idx: 0,
      id: TABS.insights.id
    }
  },
  reducers: {
    clearBuildUUID: (state) => {
      state.buildUUID = '';
    },
    clearBuildMeta: (state) => {
      state.buildMeta.isLoading = false;
      state.buildMeta.data = {};
    },
    setActiveTab: (state, { payload }) => {
      state.activeTab = payload;
    },
    updateBuildMeta: (state, { payload }) => {
      if (state.buildUUID === payload.buildUID) {
        state.buildMeta = {
          ...state.buildMeta,
          data: {
            ...state.buildMeta.data,
            ...payload.data
          }
        };
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBuildIdFromBuildInfo.pending, (state) => {
        state.buildUUID = '';
      })
      .addCase(getBuildIdFromBuildInfo.fulfilled, (state, { payload }) => {
        state.buildUUID = payload.buildId;
      })
      .addCase(getBuildMetaData.pending, (state) => {
        state.buildMeta.isLoading = true;
        state.buildMeta.data = {};
      })
      .addCase(getBuildMetaData.fulfilled, (state, { payload }) => {
        state.buildMeta.isLoading = false;
        state.buildMeta.data = payload;
      });
  }
});

export const { clearBuildMeta, clearBuildUUID, setActiveTab, updateBuildMeta } =
  actions;

export default reducer;
