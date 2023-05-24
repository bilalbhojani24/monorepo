import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Slideover,
  SlideoverBody,
  SlideoverHeader
} from '@browserstack/bifrost';

import {
  closeLogDetailsSlideover,
  isLogDetailsSlideoverOpenSelector,
  logDetailsSelector
} from '../../../../globalSlice';

import LogDetailsTable from './LogDetailsTable';
import LogRequestResponseDetailsTable from './LogRequestResponseDetailsTable';

const LogDetails = () => {
  const isOpen = useSelector(isLogDetailsSlideoverOpenSelector);
  const logDetails = useSelector(logDetailsSelector);
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
          <div className="mb-6">
            <p className="text-base-700 mb-4 text-xl font-medium">Details</p>
            <LogDetailsTable logDetails={logDetails} />
          </div>
          <div className="mb-6">
            <p className="text-base-700 mb-4 text-xl font-medium">Request</p>
            <LogRequestResponseDetailsTable data={logDetails.request_data} />
          </div>
          <div className="mb-6">
            <p className="text-base-700 mb-4 text-xl font-medium">Response</p>
            <LogRequestResponseDetailsTable data={logDetails.response_data} />
          </div>
        </div>
      </SlideoverBody>
    </Slideover>
  );
};
export default LogDetails;
