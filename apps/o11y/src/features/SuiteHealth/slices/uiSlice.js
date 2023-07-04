import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getSnPTestsFilters,
  getSnPTestsMetrics,
  getSnPUEFilters,
  getSnPUEMetrics,
  getTestBuildNames,
  getTestBuildTags,
  getTestHostNames,
  getTestTestTags,
  getUEBuildNames,
  getUEBuildTags,
  getUEHostNames,
  getUETestTags
} from 'api/snp';
import { FILTER_CATEGORIES } from 'features/FilterSkeleton/constants';
import {
  setBulkAppliedFilters,
  setBulkSelectedFilters,
  setCurrentFilterCategory,
  setIsLoadingBuildsFilters,
  setStaticFilters
} from 'features/FilterSkeleton/slices/filterSlice';
import { getAllAppliedFilters } from 'features/FilterSkeleton/slices/selectors';
import {
  getDateRangeFromSearchString,
  getFilterFromSearchString,
  getFilterQueryParams,
  updatedFilterFields
} from 'features/FilterSkeleton/utils';
import { getActiveProject } from 'globalSlice/selectors';
import isEmpty from 'lodash/isEmpty';

export const getSnPTestsFiltersData = createAsyncThunk(
  'suitehealth/getSnPTestsFilters',
  async (data, { rejectWithValue, dispatch }) => {
    dispatch(setIsLoadingBuildsFilters(true));
    dispatch(setCurrentFilterCategory(FILTER_CATEGORIES.SUITE_HEALTH_TESTS));
    try {
      const searchString = dispatch(getFilterFromSearchString());
      const response = await getSnPTestsFilters({
        ...data,
        searchString
      });
      const { selectedFilters, staticFilters } = updatedFilterFields(
        response.data,
        searchString
      );
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

export const getSnPUEFiltersData = createAsyncThunk(
  'suitehealth/getSnPUEFilters',
  async (data, { rejectWithValue, dispatch }) => {
    dispatch(setIsLoadingBuildsFilters(true));
    dispatch(
      setCurrentFilterCategory(FILTER_CATEGORIES.SUITE_HEALTH_UNIQUE_ERRORS)
    );
    try {
      const searchString = dispatch(getFilterFromSearchString());
      const response = await getSnPUEFilters({
        ...data,
        searchString
      });
      const { selectedFilters, staticFilters } = updatedFilterFields(
        response.data,
        searchString
      );
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

export const getSnPTestsMetricsData = createAsyncThunk(
  'snptests/metrics',
  async (data, { rejectWithValue, getState }) => {
    try {
      const appliedFilters = getAllAppliedFilters(getState());
      const response = await getSnPTestsMetrics({
        ...data,
        searchString: getFilterQueryParams(appliedFilters).toString()
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getSnPUEMetricsData = createAsyncThunk(
  'snptests/metrics',
  async (data, { rejectWithValue, getState }) => {
    try {
      const appliedFilters = getAllAppliedFilters(getState());
      const response = await getSnPUEMetrics({
        ...data,
        searchString: getFilterQueryParams(appliedFilters).toString()
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
