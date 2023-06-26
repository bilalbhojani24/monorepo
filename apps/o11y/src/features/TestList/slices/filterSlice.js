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
import { getAllAppliedFilters } from 'features/FilterSkeleton/slices/selectors';
import {
  getAppliedFilterObj,
  getFilterFromSearchString,
  getFilterQueryParams,
  updatedFilterFields
} from 'features/FilterSkeleton/utils';
import isEmpty from 'lodash/isEmpty';

export const getTestListingFiltersData = createAsyncThunk(
  'testlist/getFilters',
  async (data, { rejectWithValue, dispatch, getState }) => {
    dispatch(setCurrentFilterCategory(FILTER_CATEGORIES.TEST_LISTING));
    dispatch(setIsLoadingBuildsFilters(true));
    try {
      let searchParams = dispatch(getFilterFromSearchString(true));
      const issueTypeGroup = searchParams.get(
        ADV_FILTER_TYPES.issueTypeGroup.key
      );
      if (searchParams.size === 0) {
        const appliedFilters = getAllAppliedFilters(getState());
        searchParams = getFilterQueryParams(appliedFilters);
      }
      const response = await getTestListFilters({
        ...data,
        searchString: searchParams.toString()
      });

      const { selectedFilters, staticFilters } = updatedFilterFields(
        response.data,
        searchParams.toString()
      );

      if (issueTypeGroup) {
        selectedFilters.push(
          getAppliedFilterObj({
            id: 'issueTypeGroup',
            text: issueTypeGroup,
            value: issueTypeGroup,
            type: ADV_FILTER_TYPES.issueTypeGroup.key
          })
        );
      }
      dispatch(setBulkSelectedFilters(selectedFilters));
      dispatch(setBulkAppliedFilters(selectedFilters));
      if (!isEmpty(staticFilters)) {
        dispatch(setStaticFilters(staticFilters));
      }
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    } finally {
      dispatch(setIsLoadingBuildsFilters(false));
    }
  }
);
