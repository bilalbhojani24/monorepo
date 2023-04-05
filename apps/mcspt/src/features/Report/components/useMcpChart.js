import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  calculateTestDurationForAnalytics,
  formatDeviceAndAppAnalyticsData
} from 'utils/analyticsDataUtils';
import { mcpAnalyticsEvent } from 'utils/analyticsUtils';

import { updateLatestSeekTimeInSeconds } from '../slices/reportSlice';

const useMcpChart = () => {
  const dispatch = useDispatch();

  const chartGridClicked = useCallback(
    (chartname, session) => (chartEvent) => {
      /**
       * Strictly memoizing this after making it into a
       * higher order function in order to maintain the reference
       * to same function instance to prevent un-necessary re-renders
       */

      dispatch(
        updateLatestSeekTimeInSeconds(
          chartEvent?.xAxis?.[0]?.value || chartEvent?.point?.category
        )
      );

      mcpAnalyticsEvent('csptReportSeekClick', {
        graph_name: chartname,
        duration: calculateTestDurationForAnalytics(session),
        ...formatDeviceAndAppAnalyticsData(session?.device, session?.package)
      });
    },
    [dispatch]
  );

  return { chartGridClicked };
};

export default useMcpChart;
