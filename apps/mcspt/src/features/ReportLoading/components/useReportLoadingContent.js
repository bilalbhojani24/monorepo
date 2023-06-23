import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSessionDetails } from 'features/Home';
import { getRealtimeMetricThresholdsAndSubscribe } from 'features/RealtimeMetricGraphs';
import { disconnectMcpPusher } from 'utils/socketConnectionManager';

import {
  getIsSessionStopInProgress,
  getLatestSessionStatus
} from '../slices/reportLoadingSlice';

const useReportLoadingContent = () => {
  const dispatch = useDispatch();

  const sessionState = useSelector(getLatestSessionStatus);
  const sessionDetails = useSelector(getSessionDetails);
  const isSessionStopInProgress = useSelector(getIsSessionStopInProgress);

  useEffect(() => {
    if (sessionDetails?.sessionID) {
      dispatch(
        getRealtimeMetricThresholdsAndSubscribe(sessionDetails?.sessionID)
      );
    }

    return () => {
      dispatch(disconnectMcpPusher());
    };
  }, [dispatch, sessionDetails?.sessionID]);

  return {
    sessionState,
    sessionDetails,
    isSessionStopInProgress
  };
};

export default useReportLoadingContent;
