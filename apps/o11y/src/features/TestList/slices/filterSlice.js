import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTestListFilters } from 'api/testlist';
import {
  ADV_FILTER_TYPES,
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

// eslint-disable-next-line sonarjs/cognitive-complexity
const updateTestsFilterFields = (data, dispatch) => {
  if (!isEmpty(data?.applied)) {
    const { applied } = data;
    const updatedSelectedFilters = [];
    Object.keys(applied).forEach((appliedKey) => {
      switch (appliedKey) {
        case ADV_FILTER_TYPES.runs.key: {
          if (applied[appliedKey]?.length) {
            applied[appliedKey].forEach((item) => {
              updatedSelectedFilters.push(
                getAppliedFilterObj({
                  id: `${appliedKey}:${item.value}`,
                  text: item.label || item.value,
                  value: item.value,
                  type: ADV_FILTER_TYPES.runs.key
                })
              );
            });
          }
          break;
        }
        case ADV_FILTER_TYPES.ciBuildNumbers.key: {
          if (applied[appliedKey]?.length) {
            applied[appliedKey].forEach((item) => {
              updatedSelectedFilters.push(
                getAppliedFilterObj({
                  id: `${appliedKey}:${item.value}`,
                  text: item.label || item.value,
                  value: item.value,
                  type: ADV_FILTER_TYPES.ciBuildNumbers.key
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
        case ADV_FILTER_TYPES.status.key: {
          if (applied[appliedKey]?.length) {
            applied[appliedKey].forEach((item) => {
              updatedSelectedFilters.push(
                getAppliedFilterObj({
                  id: `${appliedKey}:${item.value}`,
                  text: item.label || item.value,
                  value: item.value,
                  type: ADV_FILTER_TYPES.status.key
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
        case ADV_FILTER_TYPES.hasPerformanceAnomaly.key: {
          const item = applied[appliedKey];
          if (!isNil(item))
            updatedSelectedFilters.push(
              getAppliedFilterObj({
                id: `${appliedKey}`,
                text: item,
                value: item,
                type: ADV_FILTER_TYPES.hasPerformanceAnomaly.key
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

export const getTestListingFiltersData = createAsyncThunk(
  'testlist/getFilters',
  async (data, { rejectWithValue, dispatch }) => {
    dispatch(setCurrentFilterCategory(FILTER_CATEGORIES.TEST_LISTING));
    try {
      const searchString = dispatch(getFilterFromSearchString());
      const response = await getTestListFilters({
        ...data,
        searchString
      });
      updateTestsFilterFields(response.data, dispatch);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    } finally {
      dispatch(setIsLoadingBuildsFilters(false));
    }
  }
);
