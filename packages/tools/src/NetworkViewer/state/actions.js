import { HAR_LOG_DATA_KEY } from '../constants';
import { filterData, prepareViewerData, sortBy } from '../utils';

import { initialState } from './reducer';
import * as types from './types';

const DATA_CACHE = {
  key: '',
  data: {}
};

export const updateData = (dispatch) => async (payload) => {
  const { data: payloadData, memoizationKey, showSummary } = payload;
  const log = payloadData?.get(HAR_LOG_DATA_KEY.key);
  const { entries, pages = [] } = log || {};
  if (entries) {
    // intentionally overriding key for the weak map data to be garbage collected
    // weak map data will be garbage collected if no reference of the key is present
    HAR_LOG_DATA_KEY.key = {};
  }
  const sort = initialState.get('sort');
  let dispatchPayload;
  if (memoizationKey && memoizationKey === DATA_CACHE.key) {
    // If the data is present and memoization key matches blindly serve the cached data
    dispatchPayload = DATA_CACHE.data;
  } else if (entries) {
    dispatch({ type: types.SET_IS_PROCESSING, payload: true });
    const {
      data = [],
      totalNetworkTime = 0,
      totalRequests = 0,
      totalTransferredSize = 0,
      totalUncompressedSize = 0
    } = prepareViewerData(entries);

    const sortedData = sortBy(data, sort.key, sort.isAcs);
    dispatchPayload = {
      sortedData,
      totalNetworkTime,
      showSummary,
      totalRequests,
      totalTransferredSize,
      totalUncompressedSize,
      pages: [...pages]
    };
    if (memoizationKey) {
      DATA_CACHE.key = memoizationKey;
      DATA_CACHE.data = dispatchPayload;
    }
  }

  if (dispatchPayload) {
    dispatch({
      type: types.UPDATE_DATA,
      payload: dispatchPayload
    });
    return true;
  }
  return false;
};

export const updateSearch = (dispatch) => (payload) =>
  dispatch({
    type: types.UPDATE_SEARCH,
    payload
  });

export const updateFilter = (dispatch) => (payload) =>
  dispatch({
    type: types.UPDATE_FILTER,
    payload
  });

export const updateErrorFilter = (dispatch) => (payload) =>
  dispatch({
    type: types.UPDATE_ERROR_FILTER,
    payload
  });

export const resetFilters = (dispatch) => () =>
  dispatch({
    type: types.RESET_FILTERS
  });

export const selectRequest = (dispatch) => (payload) =>
  dispatch({
    type: types.SELECT_REQUEST,
    payload
  });

export const updateSort =
  (dispatch, state) =>
  async ({ key, isAcs = true }) => {
    const initialKey = initialState.get('sort').key;
    const initialIsAcs = initialState.get('sort').isAcs;
    const initialFilter = initialState.get('filter');
    const initialSearch = initialState.get('search');
    const initialErrorFilter = initialState.get('errorFilter');
    const currKey = state.get('sort').key;
    const currIsAcs = state.get('sort').isAcs;
    const currFilter = state.get('filter');
    const currSearch = state.get('search');
    const currErrorFilter = state.get('errorFilter');

    const isFilterApplied =
      currFilter.name !== initialFilter.name ||
      currSearch !== initialSearch ||
      currErrorFilter !== initialErrorFilter;

    const isInDefaultSortOrder =
      currKey === initialKey && currIsAcs === initialIsAcs;

    let sortedData = state.get('actualData');

    if (isInDefaultSortOrder || currKey === key) {
      sortedData = state.get('data');
    } else if (isFilterApplied) {
      sortedData = filterData({
        data: state.get('actualData'),
        filter: currFilter,
        search: currSearch,
        errorFilter: currErrorFilter
      });
    }

    if (key !== initialKey || isAcs !== initialIsAcs) {
      dispatch({ type: types.SET_IS_PROCESSING, payload: true });
      sortedData = sortBy([...sortedData], key, isAcs);
    }

    dispatch({
      type: types.UPDATE_SORT,
      payload: {
        key,
        isAcs,
        data: sortedData
      }
    });
  };

export const setContainerWidth = (dispatch) => (payload) =>
  dispatch({
    type: types.SET_CONTAINER_WIDTH,
    payload
  });
