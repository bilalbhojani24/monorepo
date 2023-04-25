import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getSnPErrors,
  getSnPTests,
  getSnPTestsBreakdown,
  getSnPTestsFilters,
  getSnPUEBreakdown
} from 'api/snp';
import {
  ADV_FILTER_TYPES,
  ADV_FILTERS_PREFIX,
  FILTER_CATEGORIES
} from 'features/FilterSkeleton/constants';
import {
  setBulkAppliedFilters,
  setBulkSelectedFilters,
  setCurrentFilterCategory,
  setIsLoadingBuildsFilters,
  setStaticFilters
} from 'features/FilterSkeleton/slices/filterSlice';
import { getAppliedFilterObj } from 'features/FilterSkeleton/utils';
import isEmpty from 'lodash/isEmpty';
import { getDateInFormat } from 'utils/dateTime';

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

// let endpoint = `${versionedBaseRoute()}/projects/${normalisedName}/snp/v3/tests/?orderKey=${
//   sortOptions.type
// }&orderValue=${sortOptions.status}&isMuted=${filters.isMuted}&isFlaky=${
//   filters.isFlaky
// }`;
// if (pagingParams?.pageNumber) {
//   endpoint = `${endpoint}&pageNumber=${pagingParams.pageNumber}`;
// }
// if (filters.buildName.length > 0) {
//   // :TODO need to pass all values as comma seperated
//   endpoint = `${endpoint}&buildName=${filters.buildName}`;
// }
// if (filters.dateRange.key) {
//   const { lowerBound, upperBound } = getTimeBounds(filters.dateRange.key);
//   endpoint = `${endpoint}&lowerBound=${lowerBound}&upperBound=${upperBound}`;
// }

// export const getBuildsData = createAsyncThunk('testlist/getBuilds', async (data, { rejectWithValue, getState }) => {
//   try {
//     const appliedFilters = getAllAppliedFilters(getState());
//     const initialSearchString = getInitialSearchString(getState());
//     let searchString = initialSearchString ? `${initialSearchString}&` : '';
//     if (appliedFilters.length) {
//       searchString = getFilterQueryParams(appliedFilters).toString();
//     }
//     const response = await getBuilds({ ...data, searchString });
//     return { ...response?.data, ...data };
//   } catch (err) {
//     return rejectWithValue(err);
//   }
// });

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

export const getSnPTestsFiltersData = createAsyncThunk(
  'testlist/getSnPTestsFilters',
  // eslint-disable-next-line sonarjs/cognitive-complexity
  async (data, { rejectWithValue, dispatch }) => {
    dispatch(setCurrentFilterCategory(FILTER_CATEGORIES.SUITE_HEALTH_TESTS));
    dispatch(setIsLoadingBuildsFilters(true));
    try {
      const response = await getSnPTestsFilters({ ...data });
      if (!isEmpty(response?.data?.applied)) {
        const applied = response.data?.applied;
        const updatedSelectedFilters = [];
        if (applied[ADV_FILTER_TYPES.uniqueBuildNames]?.length) {
          applied[ADV_FILTER_TYPES.uniqueBuildNames].forEach((item) => {
            updatedSelectedFilters.push(
              getAppliedFilterObj({
                id: item.id,
                text: item.name,
                type: ADV_FILTER_TYPES.uniqueBuildNames
              })
            );
          });
        }
        if (applied[ADV_FILTER_TYPES.users]?.length) {
          applied[ADV_FILTER_TYPES.users].forEach((item) => {
            updatedSelectedFilters.push(
              getAppliedFilterObj({
                id: item.id,
                text: item.name,
                type: ADV_FILTER_TYPES.users
              })
            );
          });
        }
        if (applied[ADV_FILTER_TYPES.tags]?.length) {
          applied[ADV_FILTER_TYPES.tags].forEach((item) => {
            updatedSelectedFilters.push(
              getAppliedFilterObj({
                id: item,
                text: item,
                type: ADV_FILTER_TYPES.tags
              })
            );
          });
        }
        if (applied[ADV_FILTER_TYPES.status]?.length) {
          applied[ADV_FILTER_TYPES.status].forEach((item) => {
            updatedSelectedFilters.push(
              getAppliedFilterObj({
                id: item,
                text: item,
                type: ADV_FILTER_TYPES.status
              })
            );
          });
        }
        if (applied[ADV_FILTER_TYPES.framework]?.length) {
          applied[ADV_FILTER_TYPES.framework].forEach((item) => {
            updatedSelectedFilters.push(
              getAppliedFilterObj({
                id: item,
                text: item,
                type: ADV_FILTER_TYPES.framework
              })
            );
          });
        }
        if (applied[ADV_FILTER_TYPES.dateRange]) {
          const text = `${getDateInFormat(
            applied[ADV_FILTER_TYPES.dateRange].lowerBound
          )} - ${getDateInFormat(
            applied[ADV_FILTER_TYPES.dateRange].upperBound
          )}`;
          updatedSelectedFilters.push({
            type: ADV_FILTER_TYPES.dateRange,
            id: `${applied[ADV_FILTER_TYPES.dateRange].lowerBound},${
              applied[ADV_FILTER_TYPES.dateRange].upperBound
            }`,
            range: applied[ADV_FILTER_TYPES.dateRange],
            text,
            appliedText: `${
              ADV_FILTERS_PREFIX[ADV_FILTER_TYPES.dateRange]
            }: ${text}`,
            isApplied: true
          });
        }
        if (applied[ADV_FILTER_TYPES.search]) {
          updatedSelectedFilters.push(
            getAppliedFilterObj({
              id: applied[ADV_FILTER_TYPES.search],
              text: applied[ADV_FILTER_TYPES.search],
              type: ADV_FILTER_TYPES.search
            })
          );
        }
        dispatch(setBulkSelectedFilters(updatedSelectedFilters));
        dispatch(setBulkAppliedFilters(updatedSelectedFilters));
      }
      if (!isEmpty(response?.data?.staticFilters)) {
        dispatch(setStaticFilters(response.data.staticFilters));
      }
      dispatch(setIsLoadingBuildsFilters(false));
      return response.data;
    } catch (err) {
      dispatch(setIsLoadingBuildsFilters(false));
      return rejectWithValue(err);
    }
  }
);

export default reducer;
