// import { createSelector } from '@reduxjs/toolkit';

// import { FILTER_CATEGORIES } from '../constants';

// export const getCurrentFilterCategory = (state) =>
//   state.allFilters.currentCategory;

// export const getSelectedFilters = (state) =>
//   createSelector(
//     getCurrentFilterCategory,
//     (cat) =>
//       state.allFilters[FILTER_CATEGORIES.SUITE_HEALTH_TESTS].selectedFilters
//   );

// export const getSelectedFiltersByType = (type) =>
//   createSelector(getSelectedFilters, (selectedFilters) =>
//     selectedFilters.filter((item) => item.type === type)
//   );

// export const getSelectedFiltersIdsByType = (type) =>
//   createSelector(getSelectedFiltersByType(type), (selectedFilters) =>
//     selectedFilters.map((item) => item.id)
//   );
