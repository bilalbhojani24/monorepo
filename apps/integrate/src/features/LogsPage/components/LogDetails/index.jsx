import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Slideover,
  SlideoverBody,
  SlideoverHeader
} from '@browserstack/bifrost';

import {
  closeLogDetailsSlideover,
  isLogDetailsSlideoverOpenSelector
} from '../../../../globalSlice';

import LogDetailsTable from './LogDetailsTable';

const LogDetails = () => {
  const isOpen = useSelector(isLogDetailsSlideoverOpenSelector);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeLogDetailsSlideover());
  };
  return (
    <Slideover
      show={isOpen}
      slideoverWidth="overflow-y"
      onOverlayClick={handleClose}
      backgroundOverlay
      topMarginElementId="integrate-header-id"
      onClose={handleClose}
      size="2xl"
    >
      <SlideoverHeader
        dismissButton
        handleDismissClick={handleClose}
        heading="Request Details"
        wrapperClassName="bg-base-50"
      />
      <SlideoverBody>
        <div className="p-6">
          <LogDetailsTable />
        </div>
      </SlideoverBody>
    </Slideover>
  );
};
export default LogDetails;
