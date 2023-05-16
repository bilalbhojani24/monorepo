import { useState } from 'react';

const useShareReportButton = () => {
  const [showSharedLinkPopover, setShowSharedLinkPopover] = useState(false);

  const shareReportClicked = () => {
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
