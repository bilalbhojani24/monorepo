import React, { useEffect, useMemo, useReducer } from 'react';
import { useLatestRef } from '@browserstack/hooks';
import PropTypes from 'prop-types';

import { setContainerWidth, updateData } from './actions';
import { NetworkContext } from './Context';
import { initialState as defaultState, reducer } from './reducer';
// import { findRequestIndex } from '../../utils';
// import { ROW_ID_PREFIX } from '../../constants';

const NetworkProvider = (props) => {
  const {
    data,
    containerWidth,
    showSummary,
    memoizationKey,
    onProcessingDone
    // scrollTimeStamp,
    // scrollRequestPosition
  } = props;

  const [state, dispatch] = useReducer(reducer, defaultState);
  const value = useMemo(() => [state, dispatch], [state]);
  // const selectedReqIndex = value[0].get('selectedReqIndex');
  // const requestData = value[0].get('data');

  const latestOnProcessingDone = useLatestRef(onProcessingDone);

  // Update data onChange of network data

  useEffect(() => {
    updateData(dispatch)({
      data,
      showSummary,
      memoizationKey
      // we are getting undefined pages in some cases, used to display overall time in footer
    }).then((isprocessed) => isprocessed && latestOnProcessingDone.current());
  }, [data, showSummary, memoizationKey, latestOnProcessingDone]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setContainerWidth(dispatch)(containerWidth);
    }, 200);
    // debouncing to avoid unnecessary setContainerWidth calls
    return () => clearTimeout(timeout);
  }, [containerWidth]);

  // // Find nearby request-rowId and update scrollIndex on scrollTimeStamp receive
  // useEffect(() => {
  //   if (scrollTimeStamp) {
  //     const reqIndex = findRequestIndex({
  //       data: requestData,
  //       timestamp: scrollTimeStamp,
  //       position: scrollRequestPosition
  //     });
  //     if (reqIndex || reqIndex === 0) {
  //       updateScrollToIndex(dispatch)(requestData.get(reqIndex));
  //     }
  //   }
  // }, [scrollTimeStamp, scrollTimeStamp, scrollRequestPosition, requestData]);

  return <NetworkContext.Provider value={value} {...props} />;
};

NetworkProvider.propTypes = {
  data: PropTypes.object,
  containerWidth: PropTypes.number,
  showSummary: PropTypes.bool,
  memoizationKey: PropTypes.string,
  onProcessingDone: PropTypes.func
  // scrollRequestPosition: PropTypes.oneOf(['before', 'after']),
  // scrollTimeStamp: PropTypes.number
};

NetworkProvider.defaultProps = {
  data: null,
  containerWidth: 0,
  showSummary: true,
  memoizationKey: '',
  onProcessingDone: () => {}
  // scrollRequestPosition: 'before',
  // scrollTimeStamp: null
};

export default NetworkProvider;
