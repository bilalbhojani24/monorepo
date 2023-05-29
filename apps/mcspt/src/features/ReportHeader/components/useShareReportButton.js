import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  formatDeviceAndAppAnalyticsData,
  getSessionMetrics,
  mcpAnalyticsEvent
} from '@browserstack/mcp-shared';

import {
  getIsSharableLinkGenerating,
  getShareableLinkForReport,
  setShareableLinkForReport
} from '../slices/reportHeaderSlice';
import { generateSharableLinkForReport } from '../slices/reportHeaderThunks';

const useShareReportButton = () => {
  const [showSharedLinkPopover, setShowSharedLinkPopover] = useState(false);

  const sessionData = useSelector(getSessionMetrics);

  const isSharableLinkGenerating = useSelector(getIsSharableLinkGenerating);
  const shareableLinkForReport = useSelector(getShareableLinkForReport);

  const dispatch = useDispatch();

  const shareReportClicked = () => {
    mcpAnalyticsEvent('csptShareReportBtnClick', {
      ...formatDeviceAndAppAnalyticsData(
        sessionData?.device,
        sessionData?.package
      ),
      report_owner_user_id: sessionData?.report_owner_user_id
    });

    if (shareableLinkForReport) {
      setShowSharedLinkPopover(true);
    } else {
      dispatch(generateSharableLinkForReport(setShowSharedLinkPopover));
    }
  };

  const hideSharedLinkPopover = () => {
    setShowSharedLinkPopover(false);
  };

  useEffect(
    () => () => {
      dispatch(setShareableLinkForReport(null));
    },
    [dispatch]
  );

  return {
    isSharableLinkGenerating,
    showSharedLinkPopover,
    shareReportClicked,
    hideSharedLinkPopover
  };
};

export default useShareReportButton;
