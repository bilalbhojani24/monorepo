import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  calculateTestDurationForAnalytics,
  formatDeviceAndAppAnalyticsData
} from '../../../utils/analyticsDataUtils';
import { mcpAnalyticsEvent } from '../../../utils/analyticsUtils';
import { getSessionMetrics } from '../../Report';
import { ReportContext } from '../../Report/ReportContext';

export const useAuditAccordion = (auditDetails) => {
  const sessionData = useSelector(getSessionMetrics);
  const { handleUrlViaConsumer } = useContext(ReportContext);

  const [isAuditAccordionOpen, setIsAuditAccordionOpen] = useState(false);

  const accordionOpened = () => {
    setIsAuditAccordionOpen((prev) => !prev);

    mcpAnalyticsEvent('csptReportSummaryAccordionClick', {
      report_owner_user_id: sessionData?.report_owner_user_id,
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
      handleUrlViaConsumer(auditDetails?.link);
    }

    mcpAnalyticsEvent('csptReportSummaryRecClick', {
      report_owner_user_id: sessionData?.report_owner_user_id,
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
