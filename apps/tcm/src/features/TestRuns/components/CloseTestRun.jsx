import React, { useRef } from 'react';
import { WarningAmberOutlinedIcon } from 'assets/icons';
import {
  TMButton,
  TMModal,
  TMModalFooter,
  TMModalHeader
} from 'common/bifrostProxy';
import PropTypes from 'prop-types';

import useMiscConnections from './useMiscConnections';

const CloseTestRun = ({ updateCb }) => {
  const { closeAll, closeTestRunHandler, isCloseTRVisible } =
    useMiscConnections({ updateCb });
  const closeModalInitialFocus = useRef();

  return (
    <TMModal
      ref={closeModalInitialFocus}
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
        iconWrapperClassname="bg-danger-100"
        icon={<WarningAmberOutlinedIcon className="text-danger-600" />}
      />
      <TMModalFooter position="right">
        <TMButton
          ref={closeModalInitialFocus}
          variant="primary"
          colors="white"
          onClick={closeAll}
        >
          Cancel
        </TMButton>
        <TMButton
          variant="primary"
          colors="danger"
          wrapperClassName="ml-3"
          onClick={closeTestRunHandler}
        >
          Close Run
        </TMButton>
      </TMModalFooter>
    </TMModal>
  );
};

CloseTestRun.propTypes = {
  updateCb: PropTypes.func
};

CloseTestRun.defaultProps = {
  updateCb: () => {}
};

export default CloseTestRun;
