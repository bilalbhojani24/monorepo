import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTotalAllowedSessions,
  getTotalCompletedSessions
} from 'features/Dashboard/slices/dashboardSlice';
import {
  checkForPreviousUserSessions,
  getPreviousUserSessions
} from 'features/TestHistory';

import { EXISTIN_REPORTS_SAMPLE_SWITCH } from '../utils/homeUiConstants';

const buildBannerMsg = (completed, allowed) =>
  completed !== allowed
    ? `Kudos! You have run ${completed} tests already. Guest users can run up to ${allowed} tests. Login now for unlimited test runs.`
    : `Guest users can run up to ${allowed} tests. Login now for unlimited test runs.`;

const useHome = () => {
  const dispatch = useDispatch();

  const totalAllowedSessions = useSelector(getTotalAllowedSessions);
  const totalCompletedSessions = useSelector(getTotalCompletedSessions);
  const previousUserSessions = useSelector(getPreviousUserSessions);

  useEffect(() => {
    dispatch(checkForPreviousUserSessions());
  }, [dispatch]);

  return {
    totalCompletedSessions,
    totalAllowedSessions,
    buildBannerMsg,
    shouldShowExistingSessionsTable:
      previousUserSessions?.length > EXISTIN_REPORTS_SAMPLE_SWITCH
  };
};

export default useHome;
