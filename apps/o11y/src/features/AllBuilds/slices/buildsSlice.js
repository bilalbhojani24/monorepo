import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getBuildFilterDetails,
  getBuildsAPI,
  getBuildTags,
  getUserNames
} from 'api/builds';
import { getBuildNames } from 'api/settings';
import { isEmpty } from 'lodash';
import { getDateInFormat } from 'utils/dateTime';

import {
  BUILD_FILTER_OPERATIONS,
  BUILD_FILTER_TYPES,
  BUILD_FILTERS_PREFIX
} from '../constants';
import { getAppliedFilterObj, getFilterQueryParams } from '../utils/common';

import {
  getAllAppliedFilters,
  getInitialSearchString,
  getIsLoadingFilters
} from './buildsSelectors';

const SLICE_NAME = 'buildList';

export const getBuildsData = createAsyncThunk(
  `${SLICE_NAME}/getBuilds`,
  async (data, { rejectWithValue, getState }) => {
    try {
      const isLoadingFilters = getIsLoadingFilters(getState());
      if (isLoadingFilters) {
        return { builds: [] };
      }
      const appliedFilters = getAllAppliedFilters(getState());
      const initialSearchString = getInitialSearchString(getState());
      let searchString = initialSearchString ? `${initialSearchString}&` : '';
      if (appliedFilters.length) {
        searchString = getFilterQueryParams(appliedFilters).toString();
      }
      const response = await getBuildsAPI({ ...data, searchString });
      return { ...response?.data, ...data };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const { reducer, actions } = createSlice({
  name: SLICE_NAME,
  initialState: {
    builds: [],
    buildsPagingParams: {},
    activeBuild: {},
    isLoadingFilters: true,
    selectedFilters: [],
    appliedFilters: [],
    staticFilters: {},
    initialSearchString: window.location.search
  },
  reducers: {
    setIsLoadingBuildsFilters: (state, { payload }) => {
      state.isLoadingFilters = payload;
    },
    setBuilds: (state, { payload }) => {
      state.builds = payload.builds;
    },
    discardUnAppliedFilters: (state) => {
      state.selectedFilters = state.selectedFilters.filter(
        (item) => item.isApplied
      );
    },
    setBulkAppliedFilters: (state, { payload }) => {
      state.appliedFilters = payload;
    },
    setBulkSelectedFilters: (state, { payload }) => {
      state.selectedFilters = payload;
    },
    setAppliedFilter: (state, { payload }) => {
      const { type, operation, id, text } = payload;
      const updatedItem = {
        id,
        text,
        type,
        appliedText: BUILD_FILTERS_PREFIX[type]
          ? `${BUILD_FILTERS_PREFIX[type]}: ${text}`
          : text,
        isApplied: true
      };
      if (type === BUILD_FILTER_TYPES.dateRange) {
        const { range } = payload;
        updatedItem.range = range;
      }
      switch (operation) {
        case BUILD_FILTER_OPERATIONS.ADD: {
          state.appliedFilters.push(updatedItem);
          break;
        }
        case BUILD_FILTER_OPERATIONS.REPLACE_BY_TYPE:
          {
            const indexToBeUpdated = state.selectedFilters.findIndex(
              (item) => item.type === type
            );
            if (indexToBeUpdated !== -1) {
              state.appliedFilters[indexToBeUpdated] = updatedItem;
            } else {
              state.appliedFilters.push(updatedItem);
            }
          }
          break;
        case BUILD_FILTER_OPERATIONS.REMOVE_BY_TYPE:
          state.appliedFilters = state.appliedFilters.filter(
            (item) => item.type !== type
          );
          break;
        case BUILD_FILTER_OPERATIONS.REMOVE_BY_ID:
          state.appliedFilters = state.appliedFilters.filter(
            (item) => item.id !== id
          );
          break;
        default:
          break;
      }
      // Any change to applied filters should auto reflect to selected filters
      state.selectedFilters = [...state.appliedFilters];
    },
    setSelectedFilters: (state, { payload }) => {
      const { type, operation, id, text } = payload;
      const updatedItem = {
        id,
        text,
        type,
        appliedText: BUILD_FILTERS_PREFIX[type]
          ? `${BUILD_FILTERS_PREFIX[type]}: ${text}`
          : text,
        isApplied: false
      };
      if (type === BUILD_FILTER_TYPES.dateRange) {
        const { range } = payload;
        updatedItem.range = range;
      }
      switch (operation) {
        case BUILD_FILTER_OPERATIONS.ADD: {
          state.selectedFilters.push(updatedItem);
          break;
        }
        case BUILD_FILTER_OPERATIONS.REPLACE_BY_TYPE:
          {
            const indexToBeUpdated = state.selectedFilters.findIndex(
              (item) => item.type === type
            );
            if (indexToBeUpdated !== -1) {
              state.selectedFilters[indexToBeUpdated] = updatedItem;
            } else {
              state.selectedFilters.push(updatedItem);
            }
          }
          break;
        case BUILD_FILTER_OPERATIONS.REMOVE_BY_TYPE:
          state.selectedFilters = state.selectedFilters.filter(
            (item) => item.type !== type
          );
          break;
        case BUILD_FILTER_OPERATIONS.REMOVE_BY_ID:
          state.selectedFilters = state.selectedFilters.filter(
            (item) => item.id !== id
          );
          break;
        default:
          break;
      }
    },
    setSelectedFilterAsApplied: (state) => {
      state.appliedFilters = [...state.selectedFilters];
    },
    clearFilters: (state) => {
      state.selectedFilters = [];
      state.appliedFilters = [];
    },
    setStaticFilters: (state, { payload }) => {
      state.staticFilters = payload;
    },
    findAndUpdateBuilds: (state, { payload }) => {
      const updatedBuilds = payload || [];
      updatedBuilds.forEach((build) => {
        const idxToUpdate = state.builds.findIndex(
          (item) => item.uuid === build.uuid
        );
        if (idxToUpdate !== -1) {
          state.builds[idxToUpdate] = build;
        }
      });
    },
    setInitialSearchString: (state, { payload }) => {
      state.initialSearchString = payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBuildsData.pending, (state, payload) => {
        if (!payload.meta.arg?.newPage) {
          state.builds = [];
        }
      })
      .addCase(getBuildsData.fulfilled, (state, { payload }) => {
        if (payload.newPage) {
          state.builds.push(...payload.builds);
        } else {
          state.builds = payload.builds;
        }
        state.buildsPagingParams = payload.pagingParams;
        if (state.initialSearchString) {
          state.initialSearchString = '';
        }
      });
  }
});

export const {
  setSelectedFilters,
  setAppliedFilter,
  setSelectedFilterAsApplied,
  clearFilters,
  setBulkSelectedFilters,
  setBulkAppliedFilters,
  setIsLoadingBuildsFilters,
  setStaticFilters,
  findAndUpdateBuilds,
  setBuilds,
  discardUnAppliedFilters
} = actions;

export const getBuildsFiltersData = createAsyncThunk(
  `${SLICE_NAME}/getBuildsFiltersData`,
  // eslint-disable-next-line sonarjs/cognitive-complexity
  async (data, { rejectWithValue, dispatch }) => {
    dispatch(setIsLoadingBuildsFilters(true));
    try {
      const response = await getBuildFilterDetails({ ...data });
      if (!isEmpty(response?.data?.applied)) {
        const applied = response.data?.applied;
        const updatedSelectedFilters = [];
        if (applied[BUILD_FILTER_TYPES.buildName]?.length) {
          applied[BUILD_FILTER_TYPES.buildName].forEach((item) => {
            updatedSelectedFilters.push(
              getAppliedFilterObj({
                id: item.id,
                text: item.name,
                type: BUILD_FILTER_TYPES.buildName
              })
            );
          });
        }
        if (applied[BUILD_FILTER_TYPES.users]?.length) {
          applied[BUILD_FILTER_TYPES.users].forEach((item) => {
            updatedSelectedFilters.push(
              getAppliedFilterObj({
                id: item.id,
                text: item.name,
                type: BUILD_FILTER_TYPES.users
              })
            );
          });
        }
        if (applied[BUILD_FILTER_TYPES.tags]?.length) {
          applied[BUILD_FILTER_TYPES.tags].forEach((item) => {
            updatedSelectedFilters.push(
              getAppliedFilterObj({
                id: item,
                text: item,
                type: BUILD_FILTER_TYPES.tags
              })
            );
          });
        }
        if (applied[BUILD_FILTER_TYPES.status]?.length) {
          applied[BUILD_FILTER_TYPES.status].forEach((item) => {
            updatedSelectedFilters.push(
              getAppliedFilterObj({
                id: item,
                text: item,
                type: BUILD_FILTER_TYPES.status
              })
            );
          });
        }
        if (applied[BUILD_FILTER_TYPES.framework]?.length) {
          applied[BUILD_FILTER_TYPES.framework].forEach((item) => {
            updatedSelectedFilters.push(
              getAppliedFilterObj({
                id: item,
                text: item,
                type: BUILD_FILTER_TYPES.framework
              })
            );
          });
        }
        if (applied[BUILD_FILTER_TYPES.dateRange]) {
          const text = `${getDateInFormat(
            applied[BUILD_FILTER_TYPES.dateRange].lowerBound
          )} - ${getDateInFormat(
            applied[BUILD_FILTER_TYPES.dateRange].upperBound
          )}`;
          updatedSelectedFilters.push({
            type: BUILD_FILTER_TYPES.dateRange,
            id: `${applied[BUILD_FILTER_TYPES.dateRange].lowerBound},${
              applied[BUILD_FILTER_TYPES.dateRange].upperBound
            }`,
            range: applied[BUILD_FILTER_TYPES.dateRange],
            text,
            appliedText: `${
              BUILD_FILTERS_PREFIX[BUILD_FILTER_TYPES.dateRange]
            }: ${text}`,
            isApplied: true
          });
        }
        if (applied[BUILD_FILTER_TYPES.search]) {
          updatedSelectedFilters.push(
            getAppliedFilterObj({
              id: applied[BUILD_FILTER_TYPES.search],
              text: applied[BUILD_FILTER_TYPES.search],
              type: BUILD_FILTER_TYPES.search
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
export const getBuildTagsData = createAsyncThunk(
  `${SLICE_NAME}/getBuildTags`,
  async (data, { rejectWithValue }) => {
    try {
      const response = await getBuildTags({ ...data });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const getBuildNamesData = createAsyncThunk(
  `${SLICE_NAME}/getBuildNames`,
  async (data, { rejectWithValue }) => {
    try {
      const response = await getBuildNames({ ...data });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const getUserNamesData = createAsyncThunk(
  `${SLICE_NAME}/getUserNames`,
  async (data, { rejectWithValue }) => {
    try {
      const response = await getUserNames({ ...data });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export default reducer;
