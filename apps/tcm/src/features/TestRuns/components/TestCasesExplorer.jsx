import React from 'react';
import {
  TMButton,
  TMModal,
  TMModalBody,
  TMModalFooter,
  TMModalHeader
} from 'common/bifrostProxy';
import { MiniatureRepository } from 'features/Repository';

// import PropTypes from 'prop-types';
import useAddEditTestRun from './useAddEditTestRun';

const TestCasesExplorer = () => {
  const {
    selectedTCIDs,
    isAddTestCaseModalShown,
    projectId,
    hideTestCasesModal,
    onItemSelectionHandler,
    selectTestCasesConfirm
  } = useAddEditTestRun();

  return (
    <TMModal
      show={isAddTestCaseModalShown}
      withDismissButton
      onOverlayClick={hideTestCasesModal}
      size="6xl"
    >
      <TMModalHeader
        heading="Select Test Cases"
        subHeading=""
        handleDismissClick={hideTestCasesModal}
      />
      <TMModalBody className="">
        <div className="border-base-300 mb-4 h-full shrink-0 grow overflow-hidden rounded-md border">
          <MiniatureRepository
            projectId={projectId}
            onItemSelectionCb={onItemSelectionHandler}
            selectedTestCases={selectedTCIDs}
          />
        </div>
      </TMModalBody>
      <TMModalFooter position="right">
        <TMButton variant="primary" colors="white" onClick={hideTestCasesModal}>
          Cancel
        </TMButton>
        <TMButton
          variant="primary"
          colors="brand"
          wrapperClassName="ml-3"
          onClick={selectTestCasesConfirm}
        >
          {`Select ${selectedTCIDs?.length || ''} Test Cases`}
        </TMButton>
      </TMModalFooter>
    </TMModal>
  );
};

TestCasesExplorer.propTypes = {};

TestCasesExplorer.defaultProps = {};

export default TestCasesExplorer;
