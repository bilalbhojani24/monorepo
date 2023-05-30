import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MCP_CONSTANTS, mcpAnalyticsEvent } from '@browserstack/mcp-shared';
import {
  getIsUserLoggedIn,
  getTotalAllowedSessions,
  getTotalCompletedSessions
} from 'features/Dashboard';
import {
  checkForPreviousUserSessions,
  getPreviousUserSessions
} from 'features/TestHistory';

const useHome = () => {
  const dispatch = useDispatch();

  const isUserLoggedIn = useSelector(getIsUserLoggedIn);
  const totalAllowedSessions = useSelector(getTotalAllowedSessions);
  const totalCompletedSessions = useSelector(getTotalCompletedSessions);
  const previousUserSessions = useSelector(getPreviousUserSessions);

  const loginViaSSO = () => {
    window.remoteThreadFunctions?.openUrlInSystemBrowser(
      MCP_CONSTANTS.SSO_AUTH_URL
    );

    mcpAnalyticsEvent('csptUserLoginLogoutClick', {
      loginbtn_action: 'login'
    });
  };

  useEffect(() => {
    dispatch(checkForPreviousUserSessions(true));
  }, [dispatch]);

  return {
    totalCompletedSessions,
    totalAllowedSessions,
    loginViaSSO,
    shouldShowExistingSessionsTable:
      previousUserSessions?.length >=
      MCP_CONSTANTS.EXISTING_REPORTS_SAMPLE_SWITCH,
    showAuthBanner:
      !isUserLoggedIn && totalCompletedSessions >= totalAllowedSessions
  };
};

export default useHome;
