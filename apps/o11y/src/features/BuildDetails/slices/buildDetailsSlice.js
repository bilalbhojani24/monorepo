import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getBuildIdFromBuildInfoApi, getBuildMetaDataAPI } from 'api/builds';

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

const { reducer } = createSlice({
  name: SLICE_NAME,
  initialState: {
    buildMeta: {
      isLoading: false,
      data: {}
    },
    buildUUID: ''
  },
  reducers: {},
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

export default reducer;
