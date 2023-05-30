import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  formatDeviceAndAppAnalyticsData,
  getSessionMetrics,
  mcpAnalyticsEvent
} from '@browserstack/mcp-shared';

const useShareReportButton = () => {
  const [showSharedLinkPopover, setShowSharedLinkPopover] = useState(false);

  const sessionData = useSelector(getSessionMetrics);

  const shareReportClicked = () => {
    mcpAnalyticsEvent('csptShareReportBtnClick', {
      ...formatDeviceAndAppAnalyticsData(
        sessionData?.device,
        sessionData?.package
      ),
      report_owner_user_id: sessionData?.report_owner_user_id
    });

    setShowSharedLinkPopover(true);
  };

  const hideSharedLinkPopover = () => {
    setShowSharedLinkPopover(false);
  };

  return {
    showSharedLinkPopover,
    shareReportClicked,
    hideSharedLinkPopover
  };
};

export default useShareReportButton;
