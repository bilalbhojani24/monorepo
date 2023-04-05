import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Hyperlink } from '@browserstack/bifrost';
import { CONTACT_US, DEVICE_DETECT_TROUBLESHOOT } from 'constants/docLinks';

import {
  getStartTestError,
  setStartTestError
} from '../slices/newPerformanceSessionSlice';

const DeviceLocked = () => (
  <>
    <div className="mb-1 mt-4 text-lg font-medium leading-6">
      Failed to start test
    </div>

    <div className="mb-1 text-lg font-medium leading-6">
      Please unlock device and try again.
    </div>

    <div className="text-base-500 text-sm font-normal leading-5">
      <span>{`If the error persists, please `}</span>

      <Hyperlink
        wrapperClassName="inline-flex text-sm font-normal leading-5 text-base-500 underline"
        onClick={() => {
          window.remoteThreadFunctions?.openUrlInSystemBrowser(CONTACT_US);
        }}
      >
        contact us.
      </Hyperlink>
    </div>
  </>
);

const DevModeDisabled = () => (
  <>
    <div className="mb-1 mt-4 text-lg font-medium leading-6">
      Failed to start test
    </div>

    <div className="mb-1 text-lg font-medium leading-6">
      Enable developer mode in iOS 16 settings and try again.
    </div>

    <div className="text-base-500 text-sm font-normal leading-5">
      <span>{`Check steps to enable in `}</span>

      <Hyperlink
        wrapperClassName="inline-flex text-sm font-normal leading-5 text-base-500 underline"
        onClick={() => {
          window.remoteThreadFunctions?.openUrlInSystemBrowser(
            DEVICE_DETECT_TROUBLESHOOT
          );
        }}
      >
        troubleshooting docs.
      </Hyperlink>
    </div>
  </>
);

const GenericError = () => (
  <>
    <div className="mb-1 mt-4 text-lg font-medium leading-6">
      Failed to start test due to an internal error. Please try again.
    </div>

    <div className="text-base-500 text-sm font-normal leading-5">
      <span>{`If the error persists, please `}</span>

      <Hyperlink
        wrapperClassName="inline-flex text-sm font-normal leading-5 text-base-500 underline"
        onClick={() => {
          window.remoteThreadFunctions?.openUrlInSystemBrowser(CONTACT_US);
        }}
      >
        contact us.
      </Hyperlink>
    </div>
  </>
);

export const useStartTestErrorTypes = () => {
  const startTestError = useSelector(getStartTestError);

  const [showStartTestErrorModal, setShowStartTestErrorModal] = useState(false);

  const dispatch = useDispatch();

  const closeStartTestErrorModal = () => {
    setShowStartTestErrorModal(false);

    setTimeout(() => {
      /**
       * time for fadeout animation of modal to complete before
       * redux updates the state and content changes
       */
      dispatch(setStartTestError(null));
    }, 500);
  };

  const generateErrorUIFromResponse = (errorObj) => {
    switch (errorObj?.type) {
      case 'DEVICE_LOCKED': {
        return <DeviceLocked />;
      }

      case 'DEVELOPER_MODE_DISABLED': {
        return <DevModeDisabled />;
      }

      default: {
        return <GenericError />;
      }
    }
  };

  useEffect(() => {
    setShowStartTestErrorModal(!!startTestError?.type);
  }, [startTestError]);

  return {
    showStartTestErrorModal,
    closeStartTestErrorModal,
    errorUiFragment: generateErrorUIFromResponse(startTestError)
  };
};
