import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLatestSeekTimeInSeconds,
  getSessionMetrics,
  updateLatestVideoCurrentTimeInSeconds
} from 'features/Report';

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

  return {
    sessionData,
    updateChartSeekerPosition,
    deviceVideoRef
  };
};

export default useReportSidebar;
