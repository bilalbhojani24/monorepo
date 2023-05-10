import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
  calculateTestDurationForAnalytics,
  formatDeviceAndAppAnalyticsData
} from '../../../utils/analyticsDataUtils';
import { mcpAnalyticsEvent } from '../../../utils/analyticsUtils';
import { getSessionMetrics } from '../slices/reportSlice';

const useReport = () => {
  const sessionData = useSelector(getSessionMetrics);

  useEffect(() => {
    mcpAnalyticsEvent('csptReportViewed', {
      duration: calculateTestDurationForAnalytics(sessionData),
      ...formatDeviceAndAppAnalyticsData(
        sessionData?.device,
        sessionData?.package
      )
    });
  }, [sessionData]);

  return { sessionData };
};

export default useReport;
