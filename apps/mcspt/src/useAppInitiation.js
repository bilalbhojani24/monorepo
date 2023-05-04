import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { mcpAnalyticsEvent, useMcpAnalytics } from 'utils/analyticsUtils';

import { checkAuthAndSaveUserDetails } from './features/Dashboard/slices/dashboardThunks';

const useAppInitiation = () => {
  const dispatch = useDispatch();

  useMcpAnalytics();

  const initializeSaveAuthTokenCallback = useCallback(
    (event, value) => {
      dispatch(checkAuthAndSaveUserDetails(value));
    },
    [dispatch]
  );

  useEffect(() => {
    window.remoteThreadFunctions?.registerCallbackForSavingAuthToken(
      initializeSaveAuthTokenCallback
    );
  }, [initializeSaveAuthTokenCallback]);

  useEffect(() => {
    mcpAnalyticsEvent('csptAppLaunch');
  }, []);
};

export default useAppInitiation;
