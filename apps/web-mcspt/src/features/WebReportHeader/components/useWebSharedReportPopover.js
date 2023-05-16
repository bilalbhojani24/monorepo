import { useState } from 'react';

const useSharedReportPopover = () => {
  const [showLinkCopied, setShowLinkCopied] = useState();

  const [shareableLinkForReport] = useState(window.location.href);

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
