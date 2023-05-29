import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { mcpAnalyticsEvent, useMcpAnalytics } from '@browserstack/mcp-shared';
import { checkAuthAndSaveUserDetails } from 'features/Dashboard';

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
