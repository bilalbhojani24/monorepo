import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TMButton,
  TMModal,
  TMModalBody,
  TMModalFooter,
  TMModalHeader,
} from 'common/bifrostProxy';

import {
  setAddTestCaseModal,
  setAddTestRunFormData,
} from '../slices/testRunsSlice';

import FolderForModal from './FolderForModal';
import TableForModal from './TableForModal';

const TestCaseModal = (props) => {
  const { allFolders } = props;
  const dispatch = useDispatch();
  const testRunFormData = useSelector(
    (state) => state.testRuns.testRunFormData,
  );

  const hideModal = () => {
    dispatch(setAddTestCaseModal(false));
  };

  const addSelectedTestCases = () => {
    // only hide the modal
    hideModal();
  };

  const hideAddTestCaseModal = () => {
    // remove test case ids and then hide
    dispatch(setAddTestRunFormData({ key1: 'test_case_ids', value: [] }));
    hideModal();
  };

  return (
    <TMModal
      show
      withDismissButton
      onOverlayClick={hideAddTestCaseModal}
      size="large"
    >
      <TMModalHeader
        heading="Select Test Cases"
        handleDismissClick={hideAddTestCaseModal}
      />
      <TMModalBody>
        <div className="flex">
          <FolderForModal allFolders={allFolders} />
          <TableForModal />
        </div>
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
          onClick={addSelectedTestCases}
        >
          Select{' '}
          {testRunFormData.test_case_ids.length
            ? `${testRunFormData.test_case_ids.length}`
            : ''}{' '}
          Test Cases
        </TMButton>
      </TMModalFooter>
    </TMModal>
  );
};

export default TestCaseModal;
