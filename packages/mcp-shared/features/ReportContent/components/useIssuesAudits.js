import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  calculateTestDurationForAnalytics,
  formatDeviceAndAppAnalyticsData
} from '../../../utils/analyticsDataUtils';
import { mcpAnalyticsEvent } from '../../../utils/analyticsUtils';
import { getSessionMetrics } from '../../Report';

const useIssuesAudits = () => {
  const sessionData = useSelector(getSessionMetrics);

  const [showAllAutdits, setShowAllAudits] = useState(false);
  const [auditsToBeShown, setAuditsToBeShown] = useState([]);

  const showOrHideAllAudits = () => {
    setShowAllAudits((prev) => !prev);

    mcpAnalyticsEvent('csptReportSummaryShowAllClick', {
      report_owner_user_id: sessionData?.report_owner_user_id,
      duration: calculateTestDurationForAnalytics(sessionData),
      ...formatDeviceAndAppAnalyticsData(
        sessionData?.device,
        sessionData?.package
      )
    });
  };

  useEffect(() => {
    const audits = sessionData?.audits?.failedAudits;

    if (audits?.length > 0) {
      setAuditsToBeShown(showAllAutdits ? audits : audits.slice(0, 3));
    }
  }, [sessionData?.audits?.failedAudits, showAllAutdits]);

  return { sessionData, showAllAutdits, showOrHideAllAudits, auditsToBeShown };
};

export default useIssuesAudits;
