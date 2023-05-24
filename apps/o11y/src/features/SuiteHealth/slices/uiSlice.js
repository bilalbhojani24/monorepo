import { createAsyncThunk } from '@reduxjs/toolkit';
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
  getDateRangeFromSearchString,
  getFilterFromSearchString
} from 'features/FilterSkeleton/utils';
import { getActiveProject } from 'globalSlice/selectors';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import { getDateInFormat } from 'utils/dateTime';

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
      const searchString = dispatch(getFilterFromSearchString());
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
      const searchString = dispatch(getFilterFromSearchString());
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
      const dateRange = getDateRangeFromSearchString();
      const response = await getTestBuildNames({
        ...data,
        normalisedName: activeProject.normalisedName,
        dateRange
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
      const dateRange = getDateRangeFromSearchString();
      const response = await getTestBuildTags({
        ...data,
        normalisedName: activeProject.normalisedName,
        dateRange
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
      const dateRange = getDateRangeFromSearchString();
      const response = await getTestTestTags({
        ...data,
        normalisedName: activeProject.normalisedName,
        dateRange
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
      const dateRange = getDateRangeFromSearchString();
      const response = await getTestHostNames({
        ...data,
        normalisedName: activeProject.normalisedName,
        dateRange
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
      const dateRange = getDateRangeFromSearchString();
      const response = await getUEBuildNames({
        ...data,
        normalisedName: activeProject.normalisedName,
        dateRange
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
      const dateRange = getDateRangeFromSearchString();
      const response = await getUEBuildTags({
        ...data,
        normalisedName: activeProject.normalisedName,
        dateRange
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
      const dateRange = getDateRangeFromSearchString();
      const response = await getUETestTags({
        ...data,
        normalisedName: activeProject.normalisedName,
        dateRange
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
      const dateRange = getDateRangeFromSearchString();
      const response = await getUEHostNames({
        ...data,
        normalisedName: activeProject.normalisedName,
        dateRange
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
