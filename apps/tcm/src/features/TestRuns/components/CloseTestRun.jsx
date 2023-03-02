import React from 'react';
import { CheckOutlinedIcon } from 'assets/icons';
import {
  TMButton,
  TMModal,
  TMModalFooter,
  TMModalHeader
} from 'common/bifrostProxy';

import useMiscConnections from './useMiscConnections';

const CloseTestRun = () => {
  const { closeAll, closeTestRunHandler, isCloseTRVisible } =
    useMiscConnections();

  return (
    <TMModal
      show={isCloseTRVisible}
      withDismissButton
      onOverlayClick={closeAll}
    >
      <TMModalHeader
        heading="Close Run"
        subHeading={
          <>
            <p>Are you sure you want to close this test run?</p>
            <br />
            <p>
              Once you mark this as Closed you will not be able to update
              results anymore.
            </p>
          </>
        }
        handleDismissClick={closeAll}
        iconWrapperClassname="bg-success-100"
        icon={<CheckOutlinedIcon className="text-success-600" />}
      />
      <TMModalFooter position="right">
        <TMButton variant="primary" colors="white" onClick={closeAll}>
          Cancel
        </TMButton>
        <TMButton
          variant="primary"
          colors="brand"
          wrapperClassName="ml-3"
          onClick={closeTestRunHandler}
        >
          Close Run
        </TMButton>
      </TMModalFooter>
    </TMModal>
  );
};

CloseTestRun.propTypes = {};

CloseTestRun.defaultProps = {};

export default CloseTestRun;
