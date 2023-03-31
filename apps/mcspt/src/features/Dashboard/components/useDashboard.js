import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { pubSub } from '@browserstack/utils';
import { mcpAnalyticsEvent, useMcpAnalytics } from 'utils/analyticsUtils';

import { checkAuthAndSaveUserDetails } from '../slices/dashboardThunks';

const useDashboard = () => {
  const dispatch = useDispatch();

  useMcpAnalytics();

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

  useEffect(() => {
    mcpAnalyticsEvent('mcspAppLaunch');
  }, []);
};

export default useDashboard;
