import React from 'react';
import { useSelector } from 'react-redux';
import { Hyperlink } from '@browserstack/bifrost';

import { getStartTestError } from '../slices/newPerformanceSessionSlice';

const DeviceLocked = () => (
  <>
    <div className="mb-1 mt-4 text-lg font-medium leading-6">
      Failed to start Test
    </div>

    <div className="mb-1 text-lg font-medium leading-6">
      Please unlock device and try again.
    </div>

    <div className="text-base-500 text-sm font-normal leading-5">
      <span>{`If the error persists, please `}</span>

      <Hyperlink
        wrapperClassName="inline-flex text-sm font-normal leading-5 text-base-500 underline"
        onClick={() => {}}
      >
        contact us.
      </Hyperlink>
    </div>
  </>
);

const DevModeDisabled = () => (
  <>
    <div className="mb-1 mt-4 text-lg font-medium leading-6">
      Failed to start Test
    </div>

    <div className="mb-1 text-lg font-medium leading-6">
      Enable developer mode in iOS 16 settings and try again.
    </div>

    <div className="text-base-500 text-sm font-normal leading-5">
      <span>{`Check steps to enable in `}</span>

      <Hyperlink
        wrapperClassName="inline-flex text-sm font-normal leading-5 text-base-500 underline"
        onClick={() => {}}
      >
        troubleshooting docs.
      </Hyperlink>
    </div>
  </>
);

const GenericError = () => (
  <>
    <div className="mb-1 mt-4 text-center text-lg font-medium leading-6">
      Failed to start test due to an internal error. Please try again.
    </div>

    <div className="text-base-500 text-sm font-normal leading-5">
      <span>{`If the error persists, please `}</span>

      <Hyperlink
        wrapperClassName="inline-flex text-sm font-normal leading-5 text-base-500 underline"
        onClick={() => {}}
      >
        contact us.
      </Hyperlink>
    </div>
  </>
);

export const useStartTestErrorTypes = () => {
  const startTestError = useSelector(getStartTestError);

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

  return {
    errorUiFragment: generateErrorUIFromResponse(startTestError)
  };
};
