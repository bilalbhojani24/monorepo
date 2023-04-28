import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getBuildNames,
  getBuildTags,
  getHostNames,
  getSnPTestsFilters,
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
import {
  getAppliedFilterObj,
  getFilterFromSearchString
} from 'features/FilterSkeleton/utils';
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
                  id: `${appliedKey}:${item.value}`,
                  text: item.label,
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
                  text: item.label,
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
                  text: item.label,
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
                  text: item.label,
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
                  text: item.label,
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
                  text: item.label,
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
                  text: item.label,
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
                  text: item.label,
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
                  text: item.label,
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
  'suitehealth/getSnPTestsFilters',
  async (data, { rejectWithValue, dispatch }) => {
    dispatch(setCurrentFilterCategory(FILTER_CATEGORIES.SUITE_HEALTH_TESTS));
    try {
      const response = await getSnPTestsFilters({
        ...data,
        searchString: getFilterFromSearchString()
      });
      updateFilterFields(response.data, dispatch);
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
  async (data, { rejectWithValue }) => {
    try {
      const response = await getBuildNames({ ...data });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getBuildTagsData = createAsyncThunk(
  `suitehealth/getBuildTags`,
  async (data, { rejectWithValue }) => {
    try {
      const response = await getBuildTags({ ...data });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getTestTagsData = createAsyncThunk(
  `suitehealth/getBuildTags`,
  async (data, { rejectWithValue }) => {
    try {
      const response = await getTestTags({ ...data });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getHostNamesData = createAsyncThunk(
  `suitehealth/getBuildTags`,
  async (data, { rejectWithValue }) => {
    try {
      const response = await getHostNames({ ...data });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export default reducer;
