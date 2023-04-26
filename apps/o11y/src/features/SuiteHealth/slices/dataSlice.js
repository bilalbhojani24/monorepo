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
import isNil from 'lodash/isNil';
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

// eslint-disable-next-line sonarjs/cognitive-complexity
const updateFilterFields = (data, dispatch) => {
  if (!isEmpty(data?.applied)) {
    const { applied } = data;
    const updatedSelectedFilters = [];
    Object.keys(applied).forEach((appliedKey) => {
      switch (appliedKey) {
        case ADV_FILTER_TYPES.buildTags.key: {
          if (applied[appliedKey]?.length) {
            applied[appliedKey].forEach((item) => {
              updatedSelectedFilters.push(
                getAppliedFilterObj({
                  id: `${appliedKey}:${item}`,
                  text: item,
                  value: item,
                  type: ADV_FILTER_TYPES.buildTags.key
                })
              );
            });
          }
          break;
        }
        case ADV_FILTER_TYPES.uniqueBuildNames.key: {
          if (applied[appliedKey]?.length) {
            applied[appliedKey].forEach((item) => {
              updatedSelectedFilters.push(
                getAppliedFilterObj({
                  id: `${appliedKey}:${item}`,
                  text: item,
                  value: item,
                  type: ADV_FILTER_TYPES.uniqueBuildNames.key
                })
              );
            });
          }
          break;
        }
        case ADV_FILTER_TYPES.folder.key: {
          if (applied[appliedKey]?.length) {
            applied[appliedKey].forEach((item) => {
              updatedSelectedFilters.push(
                getAppliedFilterObj({
                  id: `${appliedKey}:${item}`,
                  text: item,
                  value: item,
                  type: ADV_FILTER_TYPES.folder.key
                })
              );
            });
          }
          break;
        }
        case ADV_FILTER_TYPES.testTags.key: {
          if (applied[appliedKey]?.length) {
            applied[appliedKey].forEach((item) => {
              updatedSelectedFilters.push(
                getAppliedFilterObj({
                  id: `${appliedKey}:${item}`,
                  text: item,
                  value: item,
                  type: ADV_FILTER_TYPES.testTags.key
                })
              );
            });
          }
          break;
        }
        case ADV_FILTER_TYPES.hostName.key: {
          if (applied[appliedKey]?.length) {
            applied[appliedKey].forEach((item) => {
              updatedSelectedFilters.push(
                getAppliedFilterObj({
                  id: `${appliedKey}:${item}`,
                  text: item,
                  value: item,
                  type: ADV_FILTER_TYPES.hostName.key
                })
              );
            });
          }
          break;
        }
        case ADV_FILTER_TYPES.isFlaky.key: {
          const item = applied[appliedKey];
          if (!isNil(item))
            updatedSelectedFilters.push(
              getAppliedFilterObj({
                id: `${appliedKey}`,
                text: item,
                value: item,
                type: ADV_FILTER_TYPES.isFlaky.key
              })
            );
          break;
        }
        case ADV_FILTER_TYPES.isNewFailure.key: {
          const item = applied[appliedKey];
          if (!isNil(item))
            updatedSelectedFilters.push(
              getAppliedFilterObj({
                id: `${appliedKey}`,
                text: item,
                value: item,
                type: ADV_FILTER_TYPES.isNewFailure.key
              })
            );
          break;
        }
        case ADV_FILTER_TYPES.isAlwaysFailing.key: {
          const item = applied[appliedKey];
          if (!isNil(item))
            updatedSelectedFilters.push(
              getAppliedFilterObj({
                id: `${appliedKey}`,
                text: item,
                value: item,
                type: ADV_FILTER_TYPES.isAlwaysFailing.key
              })
            );
          break;
        }
        case ADV_FILTER_TYPES.hasJiraDefects.key: {
          const item = applied[appliedKey];
          if (!isNil(item))
            updatedSelectedFilters.push(
              getAppliedFilterObj({
                id: `${appliedKey}`,
                text: item,
                value: item,
                type: ADV_FILTER_TYPES.hasJiraDefects.key
              })
            );
          break;
        }
        case ADV_FILTER_TYPES.isMuted.key: {
          const item = applied[appliedKey];
          if (!isNil(item))
            updatedSelectedFilters.push(
              getAppliedFilterObj({
                id: `${appliedKey}`,
                text: item,
                value: item,
                type: ADV_FILTER_TYPES.isMuted.key
              })
            );
          break;
        }
        case ADV_FILTER_TYPES.failureCategories.key: {
          if (applied[appliedKey]?.length) {
            applied[appliedKey].forEach((item) => {
              updatedSelectedFilters.push(
                getAppliedFilterObj({
                  id: `${appliedKey}:${item}`,
                  text: item,
                  value: item,
                  type: ADV_FILTER_TYPES.failureCategories.key
                })
              );
            });
          }
          break;
        }
        case ADV_FILTER_TYPES.device.key: {
          if (applied[appliedKey]?.length) {
            applied[appliedKey].forEach((item) => {
              updatedSelectedFilters.push(
                getAppliedFilterObj({
                  id: `${appliedKey}:${item}`,
                  text: item,
                  value: item,
                  type: ADV_FILTER_TYPES.device.key
                })
              );
            });
          }
          break;
        }
        case ADV_FILTER_TYPES.os.key: {
          if (applied[appliedKey]?.length) {
            applied[appliedKey].forEach((item) => {
              updatedSelectedFilters.push(
                getAppliedFilterObj({
                  id: `${appliedKey}:${item}`,
                  text: item,
                  value: item,
                  type: ADV_FILTER_TYPES.os.key
                })
              );
            });
          }
          break;
        }
        case ADV_FILTER_TYPES.browser.key: {
          if (applied[appliedKey]?.length) {
            applied[appliedKey].forEach((item) => {
              updatedSelectedFilters.push(
                getAppliedFilterObj({
                  id: `${appliedKey}:${item}`,
                  text: item,
                  value: item,
                  type: ADV_FILTER_TYPES.browser.key
                })
              );
            });
          }
          break;
        }
        case ADV_FILTER_TYPES.search.key: {
          const searchText = applied[appliedKey];
          if (searchText?.length > 0)
            updatedSelectedFilters.push(
              getAppliedFilterObj({
                id: `${appliedKey}`,
                text: searchText,
                value: searchText,
                type: ADV_FILTER_TYPES.search.key
              })
            );
          break;
        }
        case ADV_FILTER_TYPES.dateRange.key: {
          if (applied[appliedKey]) {
            const text = `${getDateInFormat(
              applied[appliedKey].lowerBound
            )} - ${getDateInFormat(applied[appliedKey].upperBound)}`;
            updatedSelectedFilters.push({
              type: ADV_FILTER_TYPES.dateRange.key,
              id: `${applied[ADV_FILTER_TYPES.dateRange.key].lowerBound},${
                applied[ADV_FILTER_TYPES.dateRange.key].upperBound
              }`,
              range: applied[ADV_FILTER_TYPES.dateRange.key],
              text,
              appliedText: `${
                ADV_FILTERS_PREFIX[ADV_FILTER_TYPES.dateRange.key]
              }: ${text}`,
              isApplied: true
            });
          }
          break;
        }
        default:
          break;
      }
    });
    dispatch(setBulkSelectedFilters(updatedSelectedFilters));
    dispatch(setBulkAppliedFilters(updatedSelectedFilters));
  }
  if (!isEmpty(data?.staticFilters)) {
    dispatch(setStaticFilters(data.staticFilters));
  }
};

export const getSnPTestsFiltersData = createAsyncThunk(
  'testlist/getSnPTestsFilters',
  async (data, { rejectWithValue, dispatch }) => {
    dispatch(setCurrentFilterCategory(FILTER_CATEGORIES.SUITE_HEALTH_TESTS));
    try {
      const response = await getSnPTestsFilters({ ...data });
      updateFilterFields(response.data, dispatch);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    } finally {
      dispatch(setIsLoadingBuildsFilters(false));
    }
  }
);

export default reducer;
