import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Logo } from '../../../common';
import {
  INTGSlideover,
  INTGSlideoverBody,
  INTGSlideoverHeader
} from '../../../common/bifrostProxy';
import {
  closeUsageSummarySlideover,
  isUsageSummarySlideoverOpenSelector,
  usageDetailsSelector
} from '../../../globalSlice';

import UsageSummaryDetailsTable from './UsageSummaryDetailsTable';

const UsageSummaryDetails = () => {
  const isOpen = useSelector(isUsageSummarySlideoverOpenSelector);
  const { label, icon } = useSelector(usageDetailsSelector);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeUsageSummarySlideover());
  };
  return (
    <INTGSlideover
      show={isOpen}
      slideoverWidth="overflow-y"
      onOverlayClick={handleClose}
      backgroundOverlay
      topMarginElementId="integrate-header-id"
      onClose={handleClose}
      size="2xl"
    >
      <INTGSlideoverHeader
        dismissButton
        handleDismissClick={handleClose}
        heading={`${label} Usage Details`}
        wrapperClassName="bg-base-50 sm:items-center"
        Icon={<Logo logo={icon} wrapperClassName="h-8 w-8" />}
      />
      <INTGSlideoverBody>
        <div className="p-6">
          <UsageSummaryDetailsTable />
        </div>
      </INTGSlideoverBody>
    </INTGSlideover>
  );
};
export default UsageSummaryDetails;
