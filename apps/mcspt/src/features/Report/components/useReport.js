import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  calculateTestDurationForAnalytics,
  formatDeviceAndAppAnalyticsData
} from 'utils/analyticsDataUtils';
import { mcpAnalyticsEvent } from 'utils/analyticsUtils';

import { getSessionMetrics } from '../slices/reportSlice';

const useReport = () => {
  const sessionData = useSelector(getSessionMetrics);

  useEffect(() => {
    mcpAnalyticsEvent('csptReportViewed', {
      test_duration: calculateTestDurationForAnalytics(sessionData),
      ...formatDeviceAndAppAnalyticsData(
        sessionData?.device,
        sessionData?.package
      )
    });
  });

  return { sessionData };
};

export default useReport;
