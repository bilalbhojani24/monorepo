import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { twClassNames } from '@browserstack/utils';

import { getLogDetailsThunk } from '../../../../api';
import { GenericError, INTGLoader } from '../../../../common';
import {
  INTGSlideover,
  INTGSlideoverBody,
  INTGSlideoverHeader
} from '../../../../common/bifrostProxy';
import { LOADING_STATUS } from '../../../../constants/loadingConstants';
import {
  closeLogDetailsSlideover,
  isLogDetailsSlideoverOpenSelector,
  logDetailsLoadingSelector,
  logDetailsLogUUIDSelector,
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

  const logDetailsLoadingStatus = useSelector(logDetailsLoadingSelector);
  const areLogDetailsLoading =
    logDetailsLoadingStatus === LOADING_STATUS.PENDING;
  const areLogDetailsLoaded =
    logDetailsLoadingStatus === LOADING_STATUS.SUCCEEDED;
  const isLogDetailsFailure = logDetailsLoadingStatus === LOADING_STATUS.FAILED;
  const logUUID = useSelector(logDetailsLogUUIDSelector);
  const handleTryAgain = () => {
    dispatch(getLogDetailsThunk({ logUUID }));
  };

  return (
    <INTGSlideover
      show={isOpen}
      slideoverWidth="overflow-y"
      onOverlayClick={handleClose}
      backgroundOverlay
      topMarginElementId="integrate-header-id"
      onClose={handleClose}
      size="3xl"
    >
      <INTGSlideoverHeader
        dismissButton
        handleDismissClick={handleClose}
        heading="Request Details"
        wrapperClassName="bg-base-50"
      />
      <INTGSlideoverBody>
        <div
          className={twClassNames('p-6', { 'h-full': areLogDetailsLoading })}
        >
          {areLogDetailsLoading && <INTGLoader wrapperClassName="h-full" />}{' '}
          {areLogDetailsLoaded && (
            <>
              <div className="mb-6">
                <p className="text-base-700 mb-4 text-xl font-medium">
                  Details
                </p>
                <LogDetailsTable logDetails={logDetails} />
              </div>
              <div className="mb-6">
                <p className="text-base-700 mb-4 text-xl font-medium">
                  Request
                </p>
                <LogRequestResponseDetailsTable
                  data={logDetails.request_data}
                  payloadOf="Request"
                />
              </div>
              <div className="mb-6">
                <p className="text-base-700 mb-4 text-xl font-medium">
                  Response
                </p>
                <LogRequestResponseDetailsTable
                  data={logDetails.response_data}
                  payloadOf="Response"
                />
              </div>
            </>
          )}
          {isLogDetailsFailure && (
            <GenericError handleTryAgain={handleTryAgain} />
          )}
        </div>
      </INTGSlideoverBody>
    </INTGSlideover>
  );
};
export default LogDetails;
