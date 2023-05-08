import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getBuildNames,
  getBuildTags,
  getHostNames,
  getSnPTestsAverageFailureRatesMetrics,
  getSnPTestsAvergeDurationMetrics,
  getSnPTestsFailuresMetrics,
  getSnPTestsFilters,
  getSnPTotalImpactedTestsMetrics,
  getSnPUETotalUniqueErrorsMetrics,
  getSnPUEUniqueImpactedTestsMetrics,
  getTestTags
} from 'api/snp';
import { SNP_PARAMS_MAPPING } from 'constants/common';
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
import { getAllAppliedFilters } from 'features/FilterSkeleton/slices/selectors';
import {
  getAppliedFilterObj,
  getFilterFromSearchString,
  getFilterQueryParams
} from 'features/FilterSkeleton/utils';
import { SH_TESTS_DATE_RANGE_OBJECT } from 'features/SHTestsFilters/constants';
import { getActiveProject } from 'globalSlice/selectors';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import { getDateInFormat } from 'utils/dateTime';

import { TABS } from '../constants';

const getInitialDateRange = () => {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(SNP_PARAMS_MAPPING.snpDateRange) || 'days7';
};

const getInitialActiveTab = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const tabVal = searchParams.get(SNP_PARAMS_MAPPING.snpTab);
  if (!tabVal) {
    return {
      idx: 0,
      value: TABS.tests
    };
  }
  const foundTabIdx = Object.keys(TABS).findIndex((item) => item === tabVal);
  if (foundTabIdx !== -1) {
    return {
      idx: foundTabIdx,
      value: TABS[tabVal]
    };
  }
  return {
    idx: 0,
    value: TABS.tests
  };
};

const getInitialBuild = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const snpActiveBuild = searchParams.get(SNP_PARAMS_MAPPING.snpActiveBuild);
  if (snpActiveBuild && snpActiveBuild !== 'all') {
    return snpActiveBuild.split(',').map((build) => build);
  }
  return [];
};
const getInitialMuted = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const snpIsMuted = searchParams.get(SNP_PARAMS_MAPPING.snpIsMuted);
  return snpIsMuted ? snpIsMuted === 'true' : false;
};
const getInitialFlaky = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const snpIsFlaky = searchParams.get(SNP_PARAMS_MAPPING.snpIsFlaky);
  return snpIsFlaky ? snpIsFlaky === 'true' : false;
};

const { reducer, actions } = createSlice({
  name: 'snp ui',
  initialState: {
    snpTestFilters: {
      dateRange: {
        key: getInitialDateRange()
      },
      buildName: getInitialBuild(),
      isMuted: getInitialMuted(),
      isFlaky: getInitialFlaky()
    },
    activeTab: getInitialActiveTab()
  },
  reducers: {
    setActiveTab: (state, { payload }) => {
      state.activeTab = payload;
    },
    setSnPTestFilters: (state, { payload }) => {
      state.snpTestFilters = {
        ...state.snpTestFilters,
        ...payload
      };
    },
    clearSnpTestFilter: (state) => {
      state.snpTestFilters = {
        dateRange: {
          key: 'days7'
        },
        buildName: [],
        isMuted: false,
        isFlaky: false
      };
    }
  },
  extraReducers: {}
});

export const { setSnPTestFilters, clearSnpTestFilter, setActiveTab } = actions;

// eslint-disable-next-line sonarjs/cognitive-complexity
const updateFilterFields = (data, dispatch, searchParams) => {
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
                  id: `${appliedKey}:${item.value}`,
                  text: item.label || item.value,
                  value: item.value,
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
                  id: `${appliedKey}:${item.value}`,
                  text: item.label || item.value,
                  value: item.value,
                  type: ADV_FILTER_TYPES.uniqueBuildNames.key
                })
              );
            });
          }
          break;
        }
        case ADV_FILTER_TYPES.folders.key: {
          if (applied[appliedKey]?.length) {
            applied[appliedKey].forEach((item) => {
              updatedSelectedFilters.push(
                getAppliedFilterObj({
                  id: `${appliedKey}:${item.value}`,
                  text: item.label || item.value,
                  value: item.value,
                  type: ADV_FILTER_TYPES.folders.key
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
                  id: `${appliedKey}:${item.value}`,
                  text: item.label || item.value,
                  value: item.value,
                  type: ADV_FILTER_TYPES.testTags.key
                })
              );
            });
          }
          break;
        }
        case ADV_FILTER_TYPES.hostNames.key: {
          if (applied[appliedKey]?.length) {
            applied[appliedKey].forEach((item) => {
              updatedSelectedFilters.push(
                getAppliedFilterObj({
                  id: `${appliedKey}:${item.value}`,
                  text: item.label || item.value,
                  value: item.value,
                  type: ADV_FILTER_TYPES.hostNames.key
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
                  id: `${appliedKey}:${item.value}`,
                  text: item.label || item.value,
                  value: item.value,
                  type: ADV_FILTER_TYPES.failureCategories.key
                })
              );
            });
          }
          break;
        }
        case ADV_FILTER_TYPES.deviceList.key: {
          if (applied[appliedKey]?.length) {
            applied[appliedKey].forEach((item) => {
              updatedSelectedFilters.push(
                getAppliedFilterObj({
                  id: `${appliedKey}:${item.value}`,
                  text: item.label || item.value,
                  value: item.value,
                  type: ADV_FILTER_TYPES.deviceList.key
                })
              );
            });
          }
          break;
        }
        case ADV_FILTER_TYPES.osList.key: {
          if (applied[appliedKey]?.length) {
            applied[appliedKey].forEach((item) => {
              updatedSelectedFilters.push(
                getAppliedFilterObj({
                  id: `${appliedKey}:${item.value}`,
                  text: item.label || item.value,
                  value: item.value,
                  type: ADV_FILTER_TYPES.osList.key
                })
              );
            });
          }
          break;
        }
        case ADV_FILTER_TYPES.browserList.key: {
          if (applied[appliedKey]?.length) {
            applied[appliedKey].forEach((item) => {
              updatedSelectedFilters.push(
                getAppliedFilterObj({
                  id: `${appliedKey}:${item.value}`,
                  text: item.label || item.value,
                  value: item.value,
                  type: ADV_FILTER_TYPES.browserList.key
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
            const daterangetype = searchParams.get('daterangetype');
            let text = '';
            let id = '';
            if (daterangetype !== 'custom') {
              text = SH_TESTS_DATE_RANGE_OBJECT[daterangetype].appliedText;
              id = daterangetype;
            } else {
              text = `${getDateInFormat(
                applied[appliedKey].lowerBound
              )} - ${getDateInFormat(applied[appliedKey].upperBound)}`;
              id = 'custom';
            }

            updatedSelectedFilters.push({
              type: ADV_FILTER_TYPES.dateRange.key,
              id,
              value: applied[ADV_FILTER_TYPES.dateRange.key],
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
  'suitehealth/getSnPTestsFilters',
  async (data, { rejectWithValue, dispatch }) => {
    dispatch(setCurrentFilterCategory(FILTER_CATEGORIES.SUITE_HEALTH_TESTS));
    try {
      const searchString = getFilterFromSearchString();
      const response = await getSnPTestsFilters({
        ...data,
        searchString
      });
      updateFilterFields(response.data, dispatch, searchString);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    } finally {
      dispatch(setIsLoadingBuildsFilters(false));
    }
  }
);

export const getBuildNamesData = createAsyncThunk(
  'testlist/getBuildNamesData',
  async (data, { rejectWithValue, getState }) => {
    try {
      const activeProject = getActiveProject(getState());
      const response = await getBuildNames({
        ...data,
        normalisedName: activeProject.normalisedName
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getBuildTagsData = createAsyncThunk(
  `suitehealth/getBuildTags`,
  async (data, { rejectWithValue, getState }) => {
    try {
      const activeProject = getActiveProject(getState());
      const response = await getBuildTags({
        ...data,
        normalisedName: activeProject.normalisedName
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getTestTagsData = createAsyncThunk(
  `suitehealth/getBuildTags`,
  async (data, { rejectWithValue, getState }) => {
    try {
      const activeProject = getActiveProject(getState());
      const response = await getTestTags({
        ...data,
        normalisedName: activeProject.normalisedName
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getHostNamesData = createAsyncThunk(
  `suitehealth/getBuildTags`,
  async (data, { rejectWithValue, getState }) => {
    try {
      const activeProject = getActiveProject(getState());
      const response = await getHostNames({
        ...data,
        normalisedName: activeProject.normalisedName
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getSnPTestsFailuresMetricsData = createAsyncThunk(
  'snptests/FailureMetrics',
  async (data, { rejectWithValue, getState }) => {
    try {
      const appliedFilters = getAllAppliedFilters(getState());
      const response = await getSnPTestsFailuresMetrics({
        ...data,
        searchString: getFilterQueryParams(appliedFilters).toString()
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getSnPTestsAverageFailureRatesMetricsData = createAsyncThunk(
  'snptests/AverageFailureRates',
  async (data, { rejectWithValue, getState }) => {
    try {
      const appliedFilters = getAllAppliedFilters(getState());
      const response = await getSnPTestsAverageFailureRatesMetrics({
        ...data,
        searchString: getFilterQueryParams(appliedFilters).toString()
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getSnPTestsAvergeDurationMetricsData = createAsyncThunk(
  'snptests/AverageDurationMetrics',
  async (data, { rejectWithValue, getState }) => {
    try {
      const appliedFilters = getAllAppliedFilters(getState());
      const response = await getSnPTestsAvergeDurationMetrics({
        ...data,
        searchString: getFilterQueryParams(appliedFilters).toString()
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getSnPUETotalUniqueErrorsMetricsData = createAsyncThunk(
  'snpue/FailureMetrics',
  async (data, { rejectWithValue, getState }) => {
    try {
      const appliedFilters = getAllAppliedFilters(getState());
      const response = await getSnPUETotalUniqueErrorsMetrics({
        ...data,
        searchString: getFilterQueryParams(appliedFilters).toString()
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getSnPUEUniqueImpactedTestsMetricsData = createAsyncThunk(
  'snpue/AverageFailureRates',
  async (data, { rejectWithValue, getState }) => {
    try {
      const appliedFilters = getAllAppliedFilters(getState());
      const response = await getSnPUEUniqueImpactedTestsMetrics({
        ...data,
        searchString: getFilterQueryParams(appliedFilters).toString()
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getSnPTotalImpactedTestsMetricsData = createAsyncThunk(
  'snpue/AverageDurationMetrics',
  async (data, { rejectWithValue, getState }) => {
    try {
      const appliedFilters = getAllAppliedFilters(getState());
      const response = await getSnPTotalImpactedTestsMetrics({
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
