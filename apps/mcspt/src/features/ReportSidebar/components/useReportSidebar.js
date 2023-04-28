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

  const updateChartSeekerPosition = () => {
    if (deviceVideoRef) {
      dispatch(
        updateLatestVideoCurrentTimeInSeconds(
          deviceVideoRef.current?.getCurrentTime?.()
        )
      );
    }
  };

  const pauseVideoOnManualSeek = () => {
    if (deviceVideoRef) {
      deviceVideoRef.current?.pause?.();
    }
  };

  useEffect(() => {
    if (latestSeekTimeInSeconds) {
      deviceVideoRef.current.seekTo(latestSeekTimeInSeconds);
      deviceVideoRef.current?.pause?.();
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
    deviceVideoRef,
    pauseVideoOnManualSeek
  };
};

export default useReportSidebar;
