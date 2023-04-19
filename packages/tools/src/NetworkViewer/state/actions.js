import { filterData, prepareViewerData, sortBy } from '../utils';

import axios from './axiosInstance';
import { initialState } from './reducer';
import * as types from './types';

export const updateData = (dispatch) => async (payload) => {
  const payloadData = payload || {};
  const { entries, pages = [] } = payloadData;
  const sort = initialState.get('sort');
  let dispatchPayload;
  if (entries) {
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
      totalRequests,
      totalTransferredSize,
      totalUncompressedSize,
      pages: [...pages]
    };
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

export const fetchFileRequest = (dispatch) => (payload) =>
  dispatch({
    type: types.FETCH_FILE.REQUEST,
    payload
  });

export const fetchFileSuccess = (dispatch) => (payload) =>
  dispatch({
    type: types.FETCH_FILE.SUCCESS,
    payload
  });

export const fetchFileFailure = (dispatch) => (payload) =>
  dispatch({
    type: types.FETCH_FILE.FAILURE,
    payload
  });

export const fetchFile =
  (dispatch) =>
  (file, options = { withCredentials: true }) => {
    fetchFileRequest(dispatch)();
    axios
      .get(file, options)
      .then(({ data }) => {
        if (data && data.log) {
          updateData(dispatch)(data.log);
        }
        fetchFileSuccess(dispatch)();
      })
      .catch((error) =>
        fetchFileFailure(dispatch)({
          title: 'Error while fetching file',
          description: error.message
        })
      );
  };
