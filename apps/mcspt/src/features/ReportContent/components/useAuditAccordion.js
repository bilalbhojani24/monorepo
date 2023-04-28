import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getSessionMetrics } from 'features/Report';
import {
  calculateTestDurationForAnalytics,
  formatDeviceAndAppAnalyticsData
} from 'utils/analyticsDataUtils';
import { mcpAnalyticsEvent } from 'utils/analyticsUtils';

export const useAuditAccordion = (auditDetails) => {
  const sessionData = useSelector(getSessionMetrics);
  const [isAuditAccordionOpen, setIsAuditAccordionOpen] = useState(false);

  const accordionOpened = () => {
    setIsAuditAccordionOpen((prev) => !prev);

    mcpAnalyticsEvent('csptReportSummaryAccordionClick', {
      issues_detected_title: auditDetails.title,
      duration: calculateTestDurationForAnalytics(sessionData),
      ...formatDeviceAndAppAnalyticsData(
        sessionData?.device,
        sessionData?.package
      )
    });
  };

  const learnHowToFix = () => {
    if (auditDetails?.link) {
      window.remoteThreadFunctions?.openUrlInSystemBrowser(auditDetails?.link);
    }

    mcpAnalyticsEvent('csptReportSummaryRecClick', {
      issues_detected_title: auditDetails.title,
      duration: calculateTestDurationForAnalytics(sessionData),
      ...formatDeviceAndAppAnalyticsData(
        sessionData?.device,
        sessionData?.package
      )
    });
  };

  return { isAuditAccordionOpen, accordionOpened, learnHowToFix };
};
