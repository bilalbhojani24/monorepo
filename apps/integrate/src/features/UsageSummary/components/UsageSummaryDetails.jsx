import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Slideover,
  SlideoverBody,
  SlideoverHeader
} from '@browserstack/bifrost';

import {
  closeUsageSummarySlideover,
  isUsageSummarySlideoverOpenSelector,
  usageDetailsSelector
} from '../../../globalSlice';

import UsageSummaryDetailsTable from './UsageSummaryDetailsTable';

const UsageSummaryDetails = () => {
  const isOpen = useSelector(isUsageSummarySlideoverOpenSelector);
  const { label } = useSelector(usageDetailsSelector);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeUsageSummarySlideover());
  };
  return (
    <Slideover
      show={isOpen}
      slideoverWidth="overflow-y"
      onOverlayClick={handleClose}
      backgroundOverlay
      topMarginElementId="integrate-header-id"
      //   backgroundOverlay={false}
      //   onEscPress={handleClose}
      onClose={handleClose}
      size="2xl"
    >
      <SlideoverHeader
        dismissButton
        handleDismissClick={handleClose}
        heading={`${label} Usage Details`}
        wrapperClassName="bg-base-50"
      />
      <SlideoverBody>
        <div className="p-6">
          <UsageSummaryDetailsTable />
        </div>
      </SlideoverBody>
    </Slideover>
  );
};
export default UsageSummaryDetails;
