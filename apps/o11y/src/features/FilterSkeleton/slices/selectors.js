import { createSelector } from '@reduxjs/toolkit';

import { ADV_FILTER_TYPES } from '../constants';

export const getCurrentFilterCategory = (state) =>
  state.allFilters.currentCategory;

export const getIsFiltersLoading = (state) => {
  const { currentCategory } = state.allFilters;
  return state.allFilters[currentCategory].isLoadingFilters;
};

export const getSelectedFilters = (state) => {
  const { currentCategory } = state.allFilters;
  return state.allFilters[currentCategory].selectedFilters;
};

export const getAllAppliedFilters = (state) => {
  const { currentCategory } = state.allFilters;
  return state.allFilters[currentCategory].appliedFilters;
};

export const getUnAppliedSelectedFilters = createSelector(
  getSelectedFilters,
  (selectedFilters) => selectedFilters.filter((item) => !item.isApplied)
);

export const getStaticFiltersByType = (type) => (state) => {
  const { currentCategory } = state.allFilters;
  return state.allFilters[currentCategory].staticFilters[type] || [];
};

export const getIsDirtyByCategory = (category) => (state) =>
  state.allFilters[category].isDirty;

// custom selectors

export const getAppliedFiltersByType = (type) =>
  createSelector(getAllAppliedFilters, (appliedFilters) =>
    appliedFilters.filter((item) => item.type === type)
  );

export const getSelectedFiltersByType = (type) =>
  createSelector(getSelectedFilters, (selectedFilters) =>
    selectedFilters.filter((item) => item.type === type)
  );

export const getSelectedFiltersIdsByType = (type) =>
  createSelector(getSelectedFiltersByType(type), (selectedFilters) =>
    selectedFilters.map((item) => item.id)
  );

export const getSelectedFilterByBooleanType = (type) =>
  createSelector(
    getSelectedFiltersByType(type),
    (selectedFilters) => selectedFilters[0]
  );

export const findAppliedFilterByType = (type) =>
  createSelector(getAllAppliedFilters, (appliedFilters) =>
    appliedFilters.find((item) => item.type === type)
  );

export const getSlideoverFiltersApplied = () =>
  createSelector(
    getAllAppliedFilters,
    (appliedFilters) =>
      appliedFilters?.filter(
        (appFilter) =>
          ![
            ADV_FILTER_TYPES.search.key,
            ADV_FILTER_TYPES.dateRange.key
          ].includes(appFilter.type)
      ) || []
  );
