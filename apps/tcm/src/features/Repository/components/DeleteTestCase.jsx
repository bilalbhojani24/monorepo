import React from 'react';
import { WarningAmberOutlinedIcon } from 'assets/icons';
import {
  TMButton,
  TMModal,
  TMModalFooter,
  TMModalHeader
} from 'common/bifrostProxy';
import PropTypes from 'prop-types';

import useDeleteTestCase from './useDeleteTestCase';

const DeleteTestCase = ({ show }) => {
  const {
    deleteTestCaseHandler,
    hideDeleteTestCaseModal,
    modalFocusRef,
    isBulkUpdate,
    selectedBulkTCCount
  } = useDeleteTestCase();

  return (
    <TMModal
      show={show}
      ref={modalFocusRef}
      withDismissButton
      onOverlayClick={hideDeleteTestCaseModal}
    >
      <TMModalHeader
        heading={
          isBulkUpdate
            ? `Delete ${selectedBulkTCCount} Test Cases`
            : 'Delete Test Case'
        }
        subHeading={
          isBulkUpdate
            ? 'Are you sure you want to delete the selected test cases? All the data within this test case will be lost. This action cannot be undone.'
            : 'Are you sure you want to delete this test case? All the data will be permanently deleted. This action cannot be undone.'
        }
        handleDismissClick={hideDeleteTestCaseModal}
        icon={<WarningAmberOutlinedIcon className="text-danger-600" />}
      />
      <TMModalFooter position="right">
        <TMButton
          variant="primary"
          colors="white"
          onClick={hideDeleteTestCaseModal}
          ref={modalFocusRef}
        >
          Cancel
        </TMButton>
        <TMButton
          variant="primary"
          colors="danger"
          wrapperClassName="ml-3"
          onClick={deleteTestCaseHandler}
        >
          {isBulkUpdate ? 'Delete' : 'Delete Test Case'}
        </TMButton>
      </TMModalFooter>
    </TMModal>
  );
};

DeleteTestCase.propTypes = {
  show: PropTypes.bool
};

DeleteTestCase.defaultProps = {
  show: false
};

export default DeleteTestCase;
