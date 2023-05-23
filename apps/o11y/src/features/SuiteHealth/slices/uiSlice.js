import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getSnPTestsFilters,
  getSnPUEFilters,
  getTestBuildNames,
  getTestBuildTags,
  getTestHostNames,
  getTestTestTags,
  getUEBuildNames,
  getUEBuildTags,
  getUEHostNames,
  getUETestTags
} from 'api/snp';
import { O11Y_DATE_RANGE, SNP_PARAMS_MAPPING } from 'constants/common';
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
import { getActiveProject } from 'globalSlice/selectors';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import { getDateInFormat, getO11yTimeBounds } from 'utils/dateTime';

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
const updateTestsFilterFields = (data, dispatch, searchParams) => {
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

// eslint-disable-next-line sonarjs/cognitive-complexity
const updateUEFilterFields = (data, dispatch, searchParams) => {
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
      if (!searchString.get(ADV_FILTER_TYPES.dateRange.key)) {
        const timeBounds = getO11yTimeBounds(O11Y_DATE_RANGE.days7.key);
        searchString.set('daterangetype', O11Y_DATE_RANGE.days30.key);
        searchString.set(
          ADV_FILTER_TYPES.dateRange.key,
          `${timeBounds.lowerBound},${timeBounds.upperBound}`
        );
      }
      const response = await getSnPTestsFilters({
        ...data,
        searchString
      });
      updateTestsFilterFields(response.data, dispatch, searchString);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    } finally {
      dispatch(setIsLoadingBuildsFilters(false));
    }
  }
);

export const getSnPUEFiltersData = createAsyncThunk(
  'suitehealth/getSnPUEFilters',
  async (data, { rejectWithValue, dispatch }) => {
    dispatch(
      setCurrentFilterCategory(FILTER_CATEGORIES.SUITE_HEALTH_UNIQUE_ERRORS)
    );
    try {
      const searchString = getFilterFromSearchString();
      if (!searchString.get(ADV_FILTER_TYPES.dateRange.key)) {
        const timeBounds = getO11yTimeBounds(O11Y_DATE_RANGE.days7.key);
        searchString.set('daterangetype', O11Y_DATE_RANGE.days30.key);
        searchString.set(
          ADV_FILTER_TYPES.dateRange.key,
          `${timeBounds.lowerBound},${timeBounds.upperBound}`
        );
      }
      const response = await getSnPUEFilters({
        ...data,
        searchString
      });
      updateUEFilterFields(response.data, dispatch, searchString);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    } finally {
      dispatch(setIsLoadingBuildsFilters(false));
    }
  }
);

export const getTestsBuildNamesData = createAsyncThunk(
  'testlist/getBuildNamesData',
  async (data, { rejectWithValue, getState }) => {
    try {
      const activeProject = getActiveProject(getState());
      const response = await getTestBuildNames({
        ...data,
        normalisedName: activeProject.normalisedName
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getTestsBuildTagsData = createAsyncThunk(
  `suitehealth/getBuildTags`,
  async (data, { rejectWithValue, getState }) => {
    try {
      const activeProject = getActiveProject(getState());
      const response = await getTestBuildTags({
        ...data,
        normalisedName: activeProject.normalisedName
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getTestsTestTagsData = createAsyncThunk(
  `suitehealth/getBuildTags`,
  async (data, { rejectWithValue, getState }) => {
    try {
      const activeProject = getActiveProject(getState());
      const response = await getTestTestTags({
        ...data,
        normalisedName: activeProject.normalisedName
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getTestsHostNamesData = createAsyncThunk(
  `suitehealth/getBuildTags`,
  async (data, { rejectWithValue, getState }) => {
    try {
      const activeProject = getActiveProject(getState());
      const response = await getTestHostNames({
        ...data,
        normalisedName: activeProject.normalisedName
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getUEBuildNamesData = createAsyncThunk(
  'testlist/getBuildNamesData',
  async (data, { rejectWithValue, getState }) => {
    try {
      const activeProject = getActiveProject(getState());
      const response = await getUEBuildNames({
        ...data,
        normalisedName: activeProject.normalisedName
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getUEBuildTagsData = createAsyncThunk(
  `suitehealth/getBuildTags`,
  async (data, { rejectWithValue, getState }) => {
    try {
      const activeProject = getActiveProject(getState());
      const response = await getUEBuildTags({
        ...data,
        normalisedName: activeProject.normalisedName
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getUETestTagsData = createAsyncThunk(
  `suitehealth/getBuildTags`,
  async (data, { rejectWithValue, getState }) => {
    try {
      const activeProject = getActiveProject(getState());
      const response = await getUETestTags({
        ...data,
        normalisedName: activeProject.normalisedName
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getUEHostNamesData = createAsyncThunk(
  `suitehealth/getBuildTags`,
  async (data, { rejectWithValue, getState }) => {
    try {
      const activeProject = getActiveProject(getState());
      const response = await getUEHostNames({
        ...data,
        normalisedName: activeProject.normalisedName
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export default reducer;
