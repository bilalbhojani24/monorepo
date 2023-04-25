import { createSelector } from '@reduxjs/toolkit';

// data selectors
export const getBuilds = (state) => state.buildsData.builds;
export const getSelectedFilters = (state) => state.buildsData.selectedFilters;
export const getIsLoadingFilters = (state) => state.buildsData.isLoadingFilters;
export const getStaticFiltersByType = (type) => (state) =>
  state.buildsData.staticFilters[type] || [];
export const getInitialSearchString = (state) =>
  state.buildsData.initialSearchString;

export const getUnAppliedSelectedFilters = createSelector(
  getSelectedFilters,
  (selectedFilters) => selectedFilters.filter((item) => !item.isApplied)
);
export const getAllAppliedFilters = (state) => state.buildsData.appliedFilters;

export const getSelectedFiltersByType = (type) =>
  createSelector(getSelectedFilters, (selectedFilters) =>
    selectedFilters.filter((item) => item.type === type)
  );

export const getAppliedFiltersByType = (type) =>
  createSelector(getAllAppliedFilters, (appliedFilters) =>
    appliedFilters.filter((item) => item.type === type)
  );

export const findAppliedFilterByType = (type) =>
  createSelector(getAllAppliedFilters, (appliedFilters) =>
    appliedFilters.find((item) => item.type === type)
  );

export const getAppliedFiltersIdsByType = (type) =>
  createSelector(getAppliedFiltersByType(type), (appliedFilters) =>
    appliedFilters.map((item) => item.id)
  );

export const getSelectedFiltersIdsByType = (type) =>
  createSelector(getSelectedFiltersByType(type), (selectedFilters) =>
    selectedFilters.map((item) => item.id)
  );
export const getBuildsPagingParams = (state) =>
  state.buildsData.buildsPagingParams;
