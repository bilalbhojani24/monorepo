import { createSlice } from '@reduxjs/toolkit';

export const FILTER_KEY = {
  URL_SEARCH: 'urlSearch',
  METHOD: 'method',
  STATUS: 'status',
  INTEGRATIONS: 'integrations',
  CONFIGURATIONS: 'configurations',
  DATE: 'date'
};

export const filtersInitialState = {
  [FILTER_KEY.URL_SEARCH]: '',
  [FILTER_KEY.METHOD]: [],
  [FILTER_KEY.STATUS]: [],
  [FILTER_KEY.INTEGRATIONS]: [],
  [FILTER_KEY.CONFIGURATIONS]: [],
  [FILTER_KEY.DATE]: {}
};
const initialState = {
  filters: filtersInitialState,
  isSlideoverOpen: false
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    openFiltersSlideover: (state) => {
      state.isSlideoverOpen = true;
    },
    closeFiltersSlideover: (state) => {
      state.isSlideoverOpen = false;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {
        ...filtersInitialState,
        [FILTER_KEY.URL_SEARCH]: state.filters[FILTER_KEY.URL_SEARCH]
      };
    }
  }
});

export const {
  openFiltersSlideover,
  closeFiltersSlideover,
  setFilters,
  clearFilters
} = filtersSlice.actions;

export default filtersSlice.reducer;

export const isFiltersSlideoverOpenSelector = (state) =>
  state.filters.isSlideoverOpen;
export const filtersSelector = (state) => state.filters.filters;
