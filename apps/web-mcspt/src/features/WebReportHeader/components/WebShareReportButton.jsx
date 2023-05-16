import React from 'react';
import { Button, MdShare, Popover } from '@browserstack/bifrost';

import useWebShareReportButton from './useWebShareReportButton';
import WebShareReportPopover from './WebShareReportPopover';

const ShareReportButton = () => {
  const { showSharedLinkPopover, shareReportClicked, hideSharedLinkPopover } =
    useWebShareReportButton();

  return (
    <Popover
      content={<WebShareReportPopover />}
      placementAlign="end"
      placementSide="bottom"
      size="lg"
      show={showSharedLinkPopover}
      onPointerDownOutside={hideSharedLinkPopover}
    >
      <Button
        wrapperClassName="mr-2"
        size="default"
        colors="white"
        variant="primary"
        icon={<MdShare />}
        onClick={shareReportClicked}
      >
        Share Report
      </Button>
    </Popover>
  );
};

export default ShareReportButton;
