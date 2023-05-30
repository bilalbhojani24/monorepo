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
      report_owner_user_id: sessionData?.report_owner_user_id,
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
