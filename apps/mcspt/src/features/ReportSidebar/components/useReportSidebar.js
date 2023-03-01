import { useDispatch, useSelector } from 'react-redux';

import {
  getLatestSeekTimeInSeconds,
  getSessionMetrics,
  updateLatestVideoCurrentTimeInSeconds
} from '../../Report';

const useReportSidebar = () => {
  const sessionData = useSelector(getSessionMetrics);

  const latestSeekTimeInSeconds = useSelector(getLatestSeekTimeInSeconds);

  const dispatch = useDispatch();

  const updateChartSeekerPosition = (videoRefCurrent) => {
    dispatch(
      updateLatestVideoCurrentTimeInSeconds(videoRefCurrent?.currentTime)
    );
  };

  return { sessionData, latestSeekTimeInSeconds, updateChartSeekerPosition };
};

export default useReportSidebar;
