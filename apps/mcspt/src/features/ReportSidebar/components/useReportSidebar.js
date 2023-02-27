import { useSelector } from 'react-redux';

import {
  getLatestSeekTimeInSeconds,
  getSessionMetrics
} from '../../Report/slices/reportSlice';

const useReportSidebar = () => {
  const sessionData = useSelector(getSessionMetrics);

  const latestSeekTimeInSeconds = useSelector(getLatestSeekTimeInSeconds);

  return { sessionData, latestSeekTimeInSeconds };
};

export default useReportSidebar;
