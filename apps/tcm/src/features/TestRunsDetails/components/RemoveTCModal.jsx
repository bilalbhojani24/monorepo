import React, { useRef } from 'react';
import { MdOutlineWarningAmber } from '@browserstack/bifrost';
import {
  TMButton,
  TMModal,
  TMModalFooter,
  TMModalHeader
} from 'common/bifrostProxy';

import { BULK_OPERATIONS } from '../const/immutableConst';

import useBulkFunctions from './useBulkFunctions';

const RemoveTCModal = () => {
  const {
    onRemoveHandler,
    bulkOperationSelected,
    selectedTestCaseIDs,
    resetBulkOperation
  } = useBulkFunctions();
  const statusFocusRef = useRef();

  return (
    <TMModal
      ref={statusFocusRef}
      show={bulkOperationSelected === BULK_OPERATIONS.REMOVE.option}
      withDismissButton
      onOverlayClick={resetBulkOperation}
    >
      <TMModalHeader
        heading={`Remove ${selectedTestCaseIDs.length} Test Cases`}
        subHeading="Are you sure you want to remove the selected test cases from this test run? Once removed, any progress on these test cases will be lost. "
        handleDismissClick={resetBulkOperation}
        iconWrapperClassname="bg-danger-100"
        icon={<MdOutlineWarningAmber className="text-danger-600 text-2xl" />}
      />
      <TMModalFooter position="right">
        <TMButton
          variant="primary"
          colors="white"
          onClick={resetBulkOperation}
          ref={statusFocusRef}
        >
          Cancel
        </TMButton>
        <TMButton
          variant="primary"
          colors="danger"
          wrapperClassName="ml-3"
          onClick={onRemoveHandler}
        >
          Remove
        </TMButton>
      </TMModalFooter>
    </TMModal>
  );
};

RemoveTCModal.propTypes = {};

RemoveTCModal.defaultProps = {};

export default RemoveTCModal;
