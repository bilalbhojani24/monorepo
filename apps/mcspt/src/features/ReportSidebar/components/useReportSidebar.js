import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLatestSeekTimeInSeconds,
  getSessionMetrics,
  updateLatestVideoCurrentTimeInSeconds
} from 'features/Report';
import { formatDeviceAndAppAnalyticsData } from 'utils/analyticsDataUtils';
import { mcpAnalyticsEvent } from 'utils/analyticsUtils';

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

  const sendPlayAnalyticsEvent = (action) => {
    mcpAnalyticsEvent('csptReportPlayPauseBtnClick', {
      playbtn_action: action,
      ...formatDeviceAndAppAnalyticsData(
        sessionData?.device,
        sessionData?.package
      )
    });
  };

  const onPauseClick = () => {
    sendPlayAnalyticsEvent('pause');
  };

  const onPlayClick = () => {
    sendPlayAnalyticsEvent('play');
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
    pauseVideoOnManualSeek,
    onPauseClick,
    onPlayClick
  };
};

export default useReportSidebar;
