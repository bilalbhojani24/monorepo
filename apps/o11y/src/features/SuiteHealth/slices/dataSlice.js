import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getSnPErrors,
  getSnPTests,
  getSnPTestsBreakdown,
  getSnPUEBreakdown
} from 'api/snp';

import {
  TESTS_HEADER_LABEL_MAPPING,
  UNIQUE_ERROR_MAIN_HEADER
} from '../constants';

const { reducer, actions } = createSlice({
  name: 'snp data',
  initialState: {
    tests: {
      data: [],
      pagingParams: {},
      isLoading: true,
      sortBy: {
        type: Object.keys(TESTS_HEADER_LABEL_MAPPING)[3],
        status: 'desc'
      }
    },
    errors: {
      data: [],
      pagingParams: {},
      isLoading: true,
      sortBy: {
        type: Object.keys(UNIQUE_ERROR_MAIN_HEADER)[2],
        status: 'desc'
      }
    }
  },
  reducers: {
    setTestsLoading: (state, { payload }) => {
      state.tests.isLoading = payload;
    },
    setTestData: (state, { payload }) => {
      state.tests.data = payload;
    },
    updateTests: (state, { payload }) => {
      state.tests.data = [...state.tests.data, ...payload];
    },
    setTestsPagingParams: (state, { payload }) => {
      state.tests.pagingParams = payload;
    },
    setTestsSortBy: (state, { payload }) => {
      state.tests.sortBy = payload;
    },
    clearSnPTests: (state) => {
      state.tests = {
        ...state.tests,
        data: [],
        pagingParams: {},
        isLoading: false
      };
    },
    setErrorsLoading: (state, { payload }) => {
      state.errors.isLoading = payload;
    },
    setErrorsData: (state, { payload }) => {
      state.errors.data = payload;
    },
    updateErrors: (state, { payload }) => {
      state.errors.data = [...state.errors.data, ...payload];
    },
    setErrorsPagingParams: (state, { payload }) => {
      state.errors.pagingParams = payload;
    },
    setErrorsSortBy: (state, { payload }) => {
      state.errors.sortBy = payload;
    },
    clearSnPErrors: (state) => {
      state.errors = {
        ...state.errors,
        data: [],
        pagingParams: {},
        isLoading: false
      };
    }
  },
  extraReducers: {}
});

export const {
  setTestsLoading,
  setTestData,
  updateTests,
  setTestsPagingParams,
  setTestsSortBy,
  clearSnPTests,
  setErrorsLoading,
  setErrorsData,
  updateErrors,
  setErrorsPagingParams,
  setErrorsSortBy,
  clearSnPErrors
} = actions;

export const getSnPTestsData = createAsyncThunk(
  'testlist/getSnPTestsData',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await getSnPTests({ ...data });
      if (data?.shouldUpdate) {
        dispatch(updateTests(response.data.tests));
      } else {
        dispatch(setTestData(response.data.tests));
      }
      dispatch(setTestsPagingParams(response.data.pagingParams));
      return response.data;
    } catch (err) {
      dispatch(clearSnPTests());
      return rejectWithValue(err);
    }
  }
);

export const getSnPTestsBreakdownData = createAsyncThunk(
  'testlist/getSnPTestsBreakdownData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getSnPTestsBreakdown({ ...data });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const getSnPErrorsData = createAsyncThunk(
  'testlist/getSnPErrorsData',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await getSnPErrors({ ...data });
      if (data?.shouldUpdate) {
        dispatch(updateErrors(response.data.errors));
      } else {
        dispatch(setErrorsData(response.data.errors));
      }
      dispatch(setErrorsPagingParams(response.data.pagingParams));
      return response.data;
    } catch (err) {
      dispatch(clearSnPErrors());
      return rejectWithValue(err);
    }
  }
);
export const getSnPUEBreakdownData = createAsyncThunk(
  'testlist/getSnPUEBreakdownData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getSnPUEBreakdown({ ...data });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export default reducer;
