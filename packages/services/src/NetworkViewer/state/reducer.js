import { List, Map } from 'immutable';

import {
  calculateFinishTime,
  calculateTimings,
  filterData,
  getSummary
} from '../utils';

import * as types from './types';

const initialState = new Map({
  data: new List(),
  actualData: new List(),
  totalNetworkTime: null,
  dataSummary: new Map(),
  sort: {
    key: 'startedDateTime',
    isAcs: true
  },
  search: '',
  filter: {
    name: null,
    value: null
  },
  errorFilter: false,
  scrollToIndex: null,
  selectedReqIndex: null,
  showReqDetail: false,
  reqDetail: null,
  containerWidth: 0,
  showSummary: false,
  isProcessing: false,
  error: null,
  loading: false
});

// eslint-disable-next-line sonarjs/cognitive-complexity
const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.UPDATE_DATA: {
      return state.withMutations((newState) => {
        const {
          sortedData,
          totalNetworkTime,
          showSummary,
          totalRequests,
          totalTransferredSize,
          totalUncompressedSize,
          pages
        } = payload;

        const sortedDataList = new List(sortedData);
        newState
          .set('data', sortedDataList)
          .set('actualData', sortedDataList)
          .set('totalNetworkTime', totalNetworkTime)
          .set('showSummary', showSummary)
          .set('isProcessing', false)
          .set('search', initialState.get('search'))
          .set('showReqDetail', initialState.get('showReqDetail'))
          .set('reqDetail', initialState.get('reqDetail'))
          .set('selectedReqIndex', initialState.get('selectedReqIndex'))
          .set('scrollToIndex', initialState.get('scrollToIndex'))
          .set('sort', initialState.get('sort'))
          .set('filter', initialState.get('filter'))
          .set('errorFilter', initialState.get('errorFilter'));

        if (showSummary) {
          newState.set(
            'dataSummary',
            new Map({
              totalRequests,
              totalTransferredSize,
              totalUncompressedSize,
              timings: calculateTimings(pages),
              finish: calculateFinishTime(sortedData)
            })
          );
        }
      });
    }
    case types.UPDATE_SEARCH: {
      return state.withMutations((newState) => {
        const data = filterData({
          data: payload.isSubset ? state.get('data') : state.get('actualData'),
          filter: state.get('filter'),
          search: payload.value,
          errorFilter: state.get('errorFilter')
        });
        const showSummary = state.get('showSummary');

        newState
          .set('search', payload.value)
          .set('data', data)
          .set('selectedReqIndex', null)
          .set('reqDetail', null)
          .set('showReqDetail', false);
        if (showSummary) {
          const summary = getSummary(data);
          newState
            .setIn(['dataSummary', 'totalRequests'], summary.totalRequests)
            .setIn(
              ['dataSummary', 'totalTransferredSize'],
              summary.totalTransferredSize
            )
            .setIn(
              ['dataSummary', 'totalUncompressedSize'],
              summary.totalUncompressedSize
            );
        }
      });
    }
    case types.UPDATE_FILTER: {
      return state.withMutations((newState) => {
        const data = filterData({
          data: state.get('actualData'),
          filter: payload,
          search: state.get('search'),
          errorFilter: state.get('errorFilter')
        });
        const showSummary = state.get('showSummary');
        newState
          .set('filter', payload)
          .set('data', data)
          .set('selectedReqIndex', null)
          .set('reqDetail', null)
          .set('showReqDetail', false);

        if (showSummary) {
          const summary = getSummary(data);
          newState
            .setIn(['dataSummary', 'totalRequests'], summary.totalRequests)
            .setIn(
              ['dataSummary', 'totalTransferredSize'],
              summary.totalTransferredSize
            )
            .setIn(
              ['dataSummary', 'totalUncompressedSize'],
              summary.totalUncompressedSize
            );
        }
      });
    }
    case types.UPDATE_ERROR_FILTER: {
      return state.withMutations((newState) => {
        const data = filterData({
          data: state.get('actualData'),
          filter: state.get('filter'),
          search: state.get('search'),
          errorFilter: payload
        });
        const showSummary = state.get('showSummary');
        newState
          .set('errorFilter', payload)
          .set('data', data)
          .set('selectedReqIndex', null)
          .set('reqDetail', null)
          .set('showReqDetail', false);
        if (showSummary) {
          const summary = getSummary(data);
          newState
            .setIn(['dataSummary', 'totalRequests'], summary.totalRequests)
            .setIn(
              ['dataSummary', 'totalTransferredSize'],
              summary.totalTransferredSize
            )
            .setIn(
              ['dataSummary', 'totalUncompressedSize'],
              summary.totalUncompressedSize
            );
        }
      });
    }
    case types.RESET_FILTERS: {
      return state.withMutations((newState) => {
        const data = filterData({
          data: state.get('actualData'),
          filter: initialState.get('filter'),
          search: initialState.get('search'),
          errorFilter: initialState.get('errorFilter')
        });
        const showSummary = state.get('showSummary');
        newState
          .set('errorFilter', initialState.get('errorFilter'))
          .set('filter', initialState.get('filter'))
          .set('search', initialState.get('search'))
          .set('data', data)
          .set('selectedReqIndex', null)
          .set('reqDetail', null)
          .set('showReqDetail', false);
        if (showSummary) {
          const summary = getSummary(data);
          newState
            .setIn(['dataSummary', 'totalRequests'], summary.totalRequests)
            .setIn(
              ['dataSummary', 'totalTransferredSize'],
              summary.totalTransferredSize
            )
            .setIn(
              ['dataSummary', 'totalUncompressedSize'],
              summary.totalUncompressedSize
            );
        }
      });
    }
    case types.UPDATE_SORT: {
      return state.withMutations((newState) => {
        const { key, isAcs, data } = payload;
        newState
          .set('sort', { key, isAcs })
          .set('data', new List(data))
          .set('isProcessing', false);
      });
    }
    case types.SELECT_REQUEST: {
      return state.withMutations((newState) => {
        newState
          .set('selectedReqIndex', payload ? payload.index : null)
          .set('reqDetail', payload)
          .set('showReqDetail', !!payload);
      });
    }
    case types.SET_CONTAINER_WIDTH: {
      return state.withMutations((newState) => {
        newState.set('containerWidth', payload);
      });
    }
    case types.SET_IS_PROCESSING: {
      return state.withMutations((newState) => {
        newState.set('isProcessing', payload);
      });
    }
    case types.FETCH_FILE.REQUEST: {
      return state.withMutations((newState) => {
        newState.set('error', null).set('loading', true);
      });
    }
    case types.FETCH_FILE.SUCCESS: {
      return state.withMutations((newState) => {
        newState.set('error', null).set('loading', false);
      });
    }
    case types.FETCH_FILE.FAILURE: {
      return state.withMutations((newState) => {
        newState.set('error', payload).set('loading', false);
      });
    }
    default:
      return state;
  }
};

export { initialState, reducer };
export default reducer;
