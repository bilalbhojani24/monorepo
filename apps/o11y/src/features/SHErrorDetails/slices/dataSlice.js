import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getSnPErrorDetailsBuilds,
  getSnPErrorDetailsErrorCount,
  getSnPErrorDetailsInfo,
  getSnPErrorDetailsPlatforms,
  getSnPErrorDetailsTrend
} from 'api/snp';
import { getAllSnPTestFilters } from 'features/SuiteHealth/slices/selectors';

const { reducer, actions } = createSlice({
  name: 'SuiteHealthErrorDetails',
  initialState: {
    ui: {
      isDetailsVisible: false,
      showDetailsFor: {
        testId: '',
        errorId: ''
      },
      cbtInfo: {
        osName: '',
        osVersion: '',
        browserName: '',
        browserVersion: '',
        osKey: '',
        browserKey: ''
      }
    }
  },
  reducers: {
    setIsSnPErrorDetailsVisible: (state, { payload }) => {
      state.ui.isDetailsVisible = payload;
    },
    setShowSnPErrorDetailsFor: (state, { payload }) => {
      state.ui.showDetailsFor = {
        testId: payload.testId,
        errorId: payload.errorId
      };
    },
    setSnPErrorCbtInfo: (state, { payload }) => {
      state.ui.cbtInfo = payload;
    }
  },
  extraReducers: {}
});

export const {
  setIsSnPErrorDetailsVisible,
  setShowSnPErrorDetailsFor,
  setSnPErrorCbtInfo
} = actions;

export const getSnPErrorDetailsInfoData = createAsyncThunk(
  'testlist/getSnPErrorDetailsInfoData',
  async (data, { rejectWithValue, getState }) => {
    try {
      const filters = getAllSnPTestFilters(getState());
      const response = await getSnPErrorDetailsInfo({ ...data, filters });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getSnPErrorDetailsTrendData = createAsyncThunk(
  'testlist/getSnPErrorDetailsTrendData',
  async (data, { rejectWithValue, getState }) => {
    try {
      const filters = getAllSnPTestFilters(getState());
      const response = await getSnPErrorDetailsTrend({ ...data, filters });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getSnPErrorDetailsBuildsData = createAsyncThunk(
  'testlist/getSnPErrorDetailsBuildsData',
  async (data, { rejectWithValue, getState }) => {
    try {
      const filters = getAllSnPTestFilters(getState());
      const response = await getSnPErrorDetailsBuilds({ ...data, filters });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const getSnPErrorDetailsPlatformsData = createAsyncThunk(
  'testlist/getSnPErrorDetailsPlatformsData',
  async (data, { rejectWithValue, getState }) => {
    try {
      const filters = getAllSnPTestFilters(getState());
      const response = await getSnPErrorDetailsPlatforms({ ...data, filters });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getSnPErrorDetailsErrorCountData = createAsyncThunk(
  'testlist/getSnPErrorDetailsErrorCountData',
  async (data, { rejectWithValue, getState }) => {
    try {
      const filters = getAllSnPTestFilters(getState());
      const response = await getSnPErrorDetailsErrorCount({ ...data, filters });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export default reducer;
