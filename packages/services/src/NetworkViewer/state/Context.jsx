import React, { useContext, useMemo } from 'react';

import * as actions from './actions';

export const NetworkContext = React.createContext();

export const useNetwork = () => {
  const context = useContext(NetworkContext);
  if (!context) {
    throw new Error('useNetwork must be used within a NetworkProvider');
  }
  const [state, dispatch] = context;

  const wrappedActions = useMemo(
    () => ({
      updateData: actions.updateData(dispatch, state),
      updateSearch: actions.updateSearch(dispatch, state),
      updateFilter: actions.updateFilter(dispatch, state),
      selectRequest: actions.selectRequest(dispatch, state),
      updateErrorFilter: actions.updateErrorFilter(dispatch, state),
      resetFilters: actions.resetFilters(dispatch, state),
      updateSort: actions.updateSort(dispatch, state),
      setContainerWidth: actions.setContainerWidth(dispatch, state),
      fetchFile: actions.fetchFile(dispatch, state)
    }),
    [dispatch, state]
  );

  return {
    state,
    dispatch,
    actions: wrappedActions
  };
};
