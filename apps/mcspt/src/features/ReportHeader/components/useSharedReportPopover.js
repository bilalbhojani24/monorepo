import { useState } from 'react';
import { useSelector } from 'react-redux';

import { getShareableLinkForReport } from '../slices/reportHeaderSlice';

const useSharedReportPopover = () => {
  const [showLinkCopied, setShowLinkCopied] = useState();

  const shareableLinkForReport = useSelector(getShareableLinkForReport);

  const copySharedReportLink = async () => {
    try {
      await window?.navigator?.clipboard?.writeText?.(shareableLinkForReport);

      setShowLinkCopied(true);

      setTimeout(() => {
        setShowLinkCopied(false);
      }, 1500);
    } catch {
      // Not given By PM
    }
  };

  return {
    showLinkCopied,
    shareableLinkForReport,
    copySharedReportLink
  };
};

export default useSharedReportPopover;
