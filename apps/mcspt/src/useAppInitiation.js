import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuthAndSaveUserDetails } from 'features/Dashboard';
import { mcpAnalyticsEvent, useMcpAnalytics } from 'utils/analyticsUtils';

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
