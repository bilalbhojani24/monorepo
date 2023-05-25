import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  formatDeviceAndAppAnalyticsData,
  getSessionMetrics,
  mcpAnalyticsEvent
} from '@browserstack/mcp-shared';

const useSharedReportPopover = () => {
  const [showLinkCopied, setShowLinkCopied] = useState();
  const [shareableLinkForReport] = useState(window.location.href);

  const sessionData = useSelector(getSessionMetrics);

  const copySharedReportLink = async () => {
    try {
      await window?.navigator?.clipboard?.writeText?.(shareableLinkForReport);

      setShowLinkCopied(true);

      setTimeout(() => {
        setShowLinkCopied(false);
      }, 1500);
    } catch {
      // Not given By PM
    } finally {
      mcpAnalyticsEvent('csptCopyLinkBtnClick', {
        ...formatDeviceAndAppAnalyticsData(
          sessionData?.device,
          sessionData?.package
        ),
        report_owner_user_id: sessionData?.report_owner_user_id
      });
    }
  };

  return {
    showLinkCopied,
    shareableLinkForReport,
    copySharedReportLink
  };
};

export default useSharedReportPopover;
