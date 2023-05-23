import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getSnPErrors,
  getSnPTests,
  getSnPTestsBreakdown,
  getSnPUEBreakdown
} from 'api/snp';
import { getAllAppliedFilters } from 'features/FilterSkeleton/slices/selectors';
import { getFilterQueryParams } from 'features/FilterSkeleton/utils';

import {
  TESTS_HEADER_LABEL_MAPPING,
  UNIQUE_ERROR_MAIN_HEADER
} from '../constants';

const { reducer, actions } = createSlice({
  name: 'suite health',
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
      breakdownData: {},
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
    setAllBreakdownData: (state, { payload }) => {
      state.errors.breakdownData = payload;
    },
    updateSingleBDOpenStatus: (state, { payload }) => {
      const { errorId, defaultOpen } = payload;
      state.errors.breakdownData[errorId].defaultOpen = defaultOpen;
    },
    updateSingleBDData: (state, { payload }) => {
      const { errorId, data } = payload;
      state.errors.breakdownData[errorId].data = data;
    },
    updateAllBreakdownData: (state, { payload }) => {
      state.errors.breakdownData = {
        ...state.errors.breakdownData,
        ...payload
      };
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
        breakdownData: {},
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
  clearSnPErrors,
  setAllBreakdownData,
  updateAllBreakdownData,
  updateSingleBDOpenStatus,
  updateSingleBDData
} = actions;

export const getSnPTestsData = createAsyncThunk(
  'suitehealth/getSnPTestsData',
  async (data, { rejectWithValue, dispatch, getState }) => {
    try {
      const appliedFilters = getAllAppliedFilters(getState());
      const response = await getSnPTests({
        ...data,
        searchString: getFilterQueryParams(appliedFilters).toString()
      });
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
  'suitehealth/getSnPTestsBreakdownData',
  async (data, { rejectWithValue, getState }) => {
    try {
      const appliedFilters = getAllAppliedFilters(getState());
      const response = await getSnPTestsBreakdown({
        ...data,
        searchString: getFilterQueryParams(appliedFilters).toString()
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const getSnPErrorsData = createAsyncThunk(
  'suitehealth/getSnPErrorsData',
  async (data, { rejectWithValue, dispatch, getState }) => {
    try {
      const appliedFilters = getAllAppliedFilters(getState());
      const response = await getSnPErrors({
        ...data,
        searchString: getFilterQueryParams(appliedFilters).toString()
      });
      const allBreakdownData = {};
      response.data.errors?.forEach((error) => {
        allBreakdownData[error.id] = {
          defaultOpen: false,
          data: []
        };
      });
      if (data?.shouldUpdate) {
        dispatch(updateErrors(response.data.errors));
        dispatch(updateAllBreakdownData(allBreakdownData));
      } else {
        dispatch(setErrorsData(response.data.errors));
        dispatch(setAllBreakdownData(allBreakdownData));
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
  'suitehealth/getSnPUEBreakdownData',
  async (data, { rejectWithValue, getState }) => {
    try {
      const appliedFilters = getAllAppliedFilters(getState());
      const response = await getSnPUEBreakdown({
        ...data,
        searchString: getFilterQueryParams(appliedFilters).toString()
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export default reducer;
