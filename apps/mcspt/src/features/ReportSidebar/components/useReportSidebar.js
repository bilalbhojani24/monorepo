import { useEffect, useLayoutEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLatestSeekTimeInSeconds,
  getSessionMetrics,
  updateLatestVideoCurrentTimeInSeconds
} from 'features/Report';

import { resizeVideoOnMcpReport } from '../utils/videoResizeUtils';

const useReportSidebar = () => {
  const sessionData = useSelector(getSessionMetrics);

  const latestSeekTimeInSeconds = useSelector(getLatestSeekTimeInSeconds);

  const deviceVideoRef = useRef(null);

  const dispatch = useDispatch();

  const updateChartSeekerPosition = (videoRefCurrent) => {
    dispatch(
      updateLatestVideoCurrentTimeInSeconds(videoRefCurrent?.currentTime)
    );
  };

  useEffect(() => {
    if (latestSeekTimeInSeconds) {
      deviceVideoRef.current.seekToTimeStampCallBack(latestSeekTimeInSeconds);
    }
  }, [latestSeekTimeInSeconds]);

  useEffect(
    () => () => {
      dispatch(updateLatestVideoCurrentTimeInSeconds(0));
    },
    [dispatch]
  );

  useLayoutEffect(() => {
    /**
     * This hook is written because chromium does not
     * support object-fit property for video elements at all.
     */

    resizeVideoOnMcpReport();
    window.addEventListener('resize', resizeVideoOnMcpReport);

    return () => {
      window.removeEventListener('resize', resizeVideoOnMcpReport);
    };
  }, []);

  return {
    sessionData,
    updateChartSeekerPosition,
    deviceVideoRef
  };
};

export default useReportSidebar;
