import React from 'react';
import { Button, MdShare, Popover } from '@browserstack/bifrost';

import SharedReportPopover from './ShareReportPopover';
import useShareReportButton from './useShareReportButton';

const ShareReportButton = () => {
  const {
    isSharableLinkGenerating,
    showSharedLinkPopover,
    shareReportClicked,
    hideSharedLinkPopover
  } = useShareReportButton();

  return (
    <Popover
      content={<SharedReportPopover />}
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
        loading={isSharableLinkGenerating}
        loaderText="Share Report"
        onClick={shareReportClicked}
      >
        Share Report
      </Button>
    </Popover>
  );
};

export default ShareReportButton;
