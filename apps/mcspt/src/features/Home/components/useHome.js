import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SSO_AUTH_URL } from 'constants/mcpConstants';
import {
  getIsUserLoggedIn,
  getTotalAllowedSessions,
  getTotalCompletedSessions
} from 'features/Dashboard/slices/dashboardSlice';
import {
  checkForPreviousUserSessions,
  getPreviousUserSessions
} from 'features/TestHistory';

import {
  EXISTIN_REPORTS_SAMPLE_SWITCH,
  SESSIONS_ALLOWED_BERFOR_WARNING
} from '../utils/homeUiConstants';

const buildBannerMsg = (completed, allowed) =>
  completed !== allowed
    ? `Kudos! You have run ${completed} tests already. Guest users can run up to ${allowed} tests. Login now for unlimited test runs.`
    : `Guest users can run up to ${allowed} tests. Login now for unlimited test runs.`;

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
    buildBannerMsg,
    loginViaSSO,
    shouldShowExistingSessionsTable:
      previousUserSessions?.length > EXISTIN_REPORTS_SAMPLE_SWITCH,
    showAuthBanner:
      !isUserLoggedIn &&
      totalCompletedSessions > SESSIONS_ALLOWED_BERFOR_WARNING
  };
};

export default useHome;
