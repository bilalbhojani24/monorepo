import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  EXISTING_REPORTS_SAMPLE_SWITCH,
  SSO_AUTH_URL
} from 'constants/mcpConstants';
import {
  getIsUserLoggedIn,
  getTotalAllowedSessions,
  getTotalCompletedSessions
} from 'features/Dashboard/slices/dashboardSlice';
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
    window.remoteThreadFunctions?.openUrlInSystemBrowser(SSO_AUTH_URL);
  };

  useEffect(() => {
    dispatch(checkForPreviousUserSessions());
  }, [dispatch]);

  return {
    totalCompletedSessions,
    totalAllowedSessions,
    loginViaSSO,
    shouldShowExistingSessionsTable:
      previousUserSessions?.length >= EXISTING_REPORTS_SAMPLE_SWITCH,
    showAuthBanner:
      !isUserLoggedIn && totalCompletedSessions >= totalAllowedSessions
  };
};

export default useHome;
