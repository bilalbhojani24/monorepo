import React from 'react';
import {
  TMButton,
  TMModal,
  TMModalBody,
  TMModalFooter,
  TMModalHeader,
} from 'bifrostProxy';

import TestCases from '../../Repository/components/TestCases';

const TestCaseModal = (props) => {
  const hideAddTestCaseModal = () => {};

  return (
    <TMModal show withDismissButton onOverlayClick={hideAddTestCaseModal}>
      <TMModalHeader
        heading="Select Test Cases"
        handleDismissClick={hideAddTestCaseModal}
      />
      <TMModalBody>
        <TestCases />
      </TMModalBody>
      <TMModalFooter position="right">
        <TMButton
          variant="primary"
          colors="white"
          onClick={hideAddTestCaseModal}
        >
          Cancel
        </TMButton>
        <TMButton
          variant="primary"
          wrapperClassName="ml-3"
          //   onClick={createProjectHandler}
        >
          Add Project
        </TMButton>
      </TMModalFooter>
    </TMModal>
  );
};

export default TestCaseModal;
