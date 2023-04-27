import { createSelector } from '@reduxjs/toolkit';

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
