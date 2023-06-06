import { useSelector } from 'react-redux';
import { getSessionDetails } from 'features/Home';

import {
  getIsSessionStopInProgress,
  getLatestSessionStatus
} from '../slices/reportLoadingSlice';

const useReportLoadingHeader = () => {
  const sessionState = useSelector(getLatestSessionStatus);
  const isSessionStopInProgress = useSelector(getIsSessionStopInProgress);
  const sessionDetails = useSelector(getSessionDetails);

  return { sessionState, sessionDetails, isSessionStopInProgress };
};

export default useReportLoadingHeader;
