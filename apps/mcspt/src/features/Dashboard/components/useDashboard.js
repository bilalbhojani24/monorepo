import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { pubSub } from '@browserstack/utils';

import { checkAuthAndSaveUserDetails } from '../slices/dashboardThunks';

const useDashboard = () => {
  const dispatch = useDispatch();

  const initializeSaveAuthTokenCallback = useCallback(
    (event, value) => {
      dispatch(checkAuthAndSaveUserDetails(value));
    },
    [dispatch]
  );

  useEffect(() => {
    window.pubSub = pubSub();

    window.remoteThreadFunctions?.registerCallbackForSavingAuthToken(
      initializeSaveAuthTokenCallback
    );
  }, [initializeSaveAuthTokenCallback]);

  useEffect(() => {
    dispatch(checkAuthAndSaveUserDetails());
  }, [dispatch]);
};

export default useDashboard;
