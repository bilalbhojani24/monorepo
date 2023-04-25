import { createSlice } from '@reduxjs/toolkit';

import {
  ADV_FILTER_OPERATIONS,
  ADV_FILTER_TYPES,
  ADV_FILTERS_PREFIX,
  FILTER_CATEGORIES
} from '../constants';

const { reducer, actions } = createSlice({
  name: 'Filters Skeleton',
  initialState: {
    currentCategory: FILTER_CATEGORIES.SUITE_HEALTH_TESTS,
    [FILTER_CATEGORIES.SUITE_HEALTH_TESTS]: {
      isLoadingFilters: true,
      selectedFilters: [],
      appliedFilters: [],
      staticFilters: {}
    },
    [FILTER_CATEGORIES.SUITE_HEALTH_UNIQUE_ERRORS]: {
      isLoadingFilters: true,
      selectedFilters: [],
      appliedFilters: [],
      staticFilters: {}
    }
  },
  reducers: {
    setCurrentFilterCategory: (state, { payload }) => {
      state.currentCategory = payload;
    },
    setIsLoadingBuildsFilters: (state, { payload }) => {
      state[state.currentCategory].isLoadingFilters = payload;
    },
    discardUnAppliedFilters: (state) => {
      state[state.currentCategory].selectedFilters = state[
        state.currentCategory
      ].selectedFilters.filter((item) => item.isApplied);
    },
    setBulkAppliedFilters: (state, { payload }) => {
      state[state.currentCategory].appliedFilters = payload;
    },
    setBulkSelectedFilters: (state, { payload }) => {
      state[state.currentCategory].selectedFilters = payload;
    },
    setAppliedFilter: (state, { payload }) => {
      const { type, operation, id, text } = payload;
      const updatedItem = {
        id,
        text,
        type,
        appliedText: ADV_FILTERS_PREFIX[type]
          ? `${ADV_FILTERS_PREFIX[type]}: ${text}`
          : text,
        isApplied: true
      };
      if (type === ADV_FILTER_TYPES.dateRange) {
        const { range } = payload;
        updatedItem.range = range;
      }
      switch (operation) {
        case ADV_FILTER_OPERATIONS.ADD: {
          state[state.currentCategory].appliedFilters.push(updatedItem);
          break;
        }
        case ADV_FILTER_OPERATIONS.REPLACE_BY_TYPE:
          {
            const indexToBeUpdated = state[
              state.currentCategory
            ].selectedFilters.findIndex((item) => item.type === type);
            if (indexToBeUpdated !== -1) {
              state[state.currentCategory].appliedFilters[indexToBeUpdated] =
                updatedItem;
            } else {
              state[state.currentCategory].appliedFilters.push(updatedItem);
            }
          }
          break;
        case ADV_FILTER_OPERATIONS.REMOVE_BY_TYPE:
          state[state.currentCategory].appliedFilters = state[
            state.currentCategory
          ].appliedFilters.filter((item) => item.type !== type);
          break;
        case ADV_FILTER_OPERATIONS.REMOVE_BY_ID:
          state[state.currentCategory].appliedFilters = state[
            state.currentCategory
          ].appliedFilters.filter((item) => item.id !== id);
          break;
        default:
          break;
      }
      // Any change to applied filters should auto reflect to selected filters
      state[state.currentCategory].selectedFilters = [
        ...state[state.currentCategory].appliedFilters
      ];
    },
    setSelectedFilters: (state, { payload }) => {
      const { type, operation, id, text } = payload;
      const updatedItem = {
        id,
        text,
        type,
        appliedText: ADV_FILTERS_PREFIX[type]
          ? `${ADV_FILTERS_PREFIX[type]}: ${text}`
          : text,
        isApplied: false
      };
      if (type === ADV_FILTER_TYPES.dateRange) {
        const { range } = payload;
        updatedItem.range = range;
      }
      switch (operation) {
        case ADV_FILTER_OPERATIONS.ADD: {
          state[state.currentCategory].selectedFilters.push(updatedItem);
          break;
        }
        case ADV_FILTER_OPERATIONS.REPLACE_BY_TYPE:
          {
            const indexToBeUpdated = state[
              state.currentCategory
            ].selectedFilters.findIndex((item) => item.type === type);
            if (indexToBeUpdated !== -1) {
              state[state.currentCategory].selectedFilters[indexToBeUpdated] =
                updatedItem;
            } else {
              state[state.currentCategory].selectedFilters.push(updatedItem);
            }
          }
          break;
        case ADV_FILTER_OPERATIONS.REMOVE_BY_TYPE:
          state[state.currentCategory].selectedFilters = state[
            state.currentCategory
          ].selectedFilters.filter((item) => item.type !== type);
          break;
        case ADV_FILTER_OPERATIONS.REMOVE_BY_ID:
          state[state.currentCategory].selectedFilters = state[
            state.currentCategory
          ].selectedFilters.filter((item) => item.id !== id);
          break;
        default:
          break;
      }
    },
    setSelectedFilterAsApplied: (state) => {
      state[state.currentCategory].appliedFilters = [
        ...state[state.currentCategory].selectedFilters
      ];
    },
    clearFilters: (state) => {
      state[state.currentCategory].selectedFilters = [];
      state[state.currentCategory].appliedFilters = [];
    },
    setStaticFilters: (state, { payload }) => {
      state[state.currentCategory].staticFilters = payload;
    },
    setInitialSearchString: (state, { payload }) => {
      state[state.currentCategory].initialSearchString = payload;
    }
  }
});

export const {
  setCurrentFilterCategory,
  setSelectedFilters,
  setAppliedFilter,
  setSelectedFilterAsApplied,
  clearFilters,
  setBulkSelectedFilters,
  setBulkAppliedFilters,
  setIsLoadingBuildsFilters,
  setStaticFilters,
  discardUnAppliedFilters,
  setInitialSearchString
} = actions;

export default reducer;
