import React from 'react';
import { WarningAmberOutlinedIcon } from 'assets/icons';
import { TMButton, TMModal, TMModalFooter, TMModalHeader } from 'bifrostProxy';

import useTestCases from './useTestCases';

const DeleteTestCase = () => {
  const { deleteTestCaseHandler, hideDeleteTestCaseModal } = useTestCases();

  return (
    <TMModal show withDismissButton onOverlayClick={hideDeleteTestCaseModal}>
      <TMModalHeader
        heading="Delete Test Case"
        subHeading="Are you sure you want to delete this test case? All the data will be permanently deleted. This action cannot be undone."
        handleDismissClick={hideDeleteTestCaseModal}
        Icon={WarningAmberOutlinedIcon}
      />
      <TMModalFooter position="right">
        <TMButton
          variant="primary"
          colors="white"
          onClick={hideDeleteTestCaseModal}
        >
          Cancel
        </TMButton>
        <TMButton
          variant="primary"
          colors="danger"
          wrapperClassName="ml-3"
          onClick={deleteTestCaseHandler}
        >
          Delete Test Case
        </TMButton>
      </TMModalFooter>
    </TMModal>
  );
};

export default DeleteTestCase;
