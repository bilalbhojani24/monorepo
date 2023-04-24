import React, { useEffect, useMemo, useReducer } from 'react';
import { useLatestRef } from '@browserstack/hooks';
import PropTypes from 'prop-types';

import { fetchFile, setContainerWidth, updateData } from './actions';
import { NetworkContext } from './Context';
import { initialState as defaultState, reducer } from './reducer';
// import { findRequestIndex } from '../../utils';
// import { ROW_ID_PREFIX } from '../../constants';

const NetworkProvider = (props) => {
  const {
    data,
    file,
    fetchOptions,
    containerWidth,
    showSummary,
    onProcessingDone
  } = props;

  const [state, dispatch] = useReducer(reducer, defaultState);
  const value = useMemo(() => [state, dispatch], [state]);

  const latestOnProcessingDone = useLatestRef(onProcessingDone);

  // Update data onChange of network data
  useEffect(() => {
    updateData(dispatch)({
      data,
      showSummary
      // we are getting undefined pages in some cases, used to display overall time in footer
    }).then((isprocessed) => isprocessed && latestOnProcessingDone.current());
  }, [data, showSummary, latestOnProcessingDone]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setContainerWidth(dispatch)(containerWidth);
    }, 200);
    // debouncing to avoid unnecessary setContainerWidth calls
    return () => clearTimeout(timeout);
  }, [containerWidth]);

  // Fetch HAR file onChange of file prop
  useEffect(() => {
    if (file) {
      fetchFile(dispatch)(file, fetchOptions);
    }
  }, [fetchOptions, file]);

  return <NetworkContext.Provider value={value} {...props} />;
};

NetworkProvider.propTypes = {
  data: PropTypes.object,
  containerWidth: PropTypes.number,
  showSummary: PropTypes.bool,
  file: PropTypes.string,
  onProcessingDone: PropTypes.func,
  fetchOptions: PropTypes.object
};

NetworkProvider.defaultProps = {
  data: null,
  containerWidth: 0,
  showSummary: true,
  file: '',
  onProcessingDone: () => {},
  fetchOptions: {}
};

export default NetworkProvider;
