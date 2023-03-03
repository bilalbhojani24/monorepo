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

const DeleteTestRun = ({ redirectToDetails }) => {
  const { closeAll, deleteTestRunHandler, isDeleteModalVisible } =
    useMiscConnections({ redirectToDetails });
  const deleteModalInitialFocus = useRef();

  return (
    <TMModal
      ref={deleteModalInitialFocus}
      show={isDeleteModalVisible}
      withDismissButton
      onOverlayClick={closeAll}
    >
      <TMModalHeader
        heading="Delete Test Run"
        subHeading="Are you sure you want to delete this test run? All the data within this test run will be lost. This action cannot be undone."
        handleDismissClick={closeAll}
        iconWrapperClassname="bg-danger-100"
        icon={<WarningAmberOutlinedIcon className="text-danger-600" />}
      />
      <TMModalFooter position="right">
        <TMButton
          ref={deleteModalInitialFocus}
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
          onClick={deleteTestRunHandler}
        >
          Delete
        </TMButton>
      </TMModalFooter>
    </TMModal>
  );
};

DeleteTestRun.propTypes = {
  redirectToDetails: PropTypes.bool
};

DeleteTestRun.defaultProps = {
  redirectToDetails: false
};

export default DeleteTestRun;
