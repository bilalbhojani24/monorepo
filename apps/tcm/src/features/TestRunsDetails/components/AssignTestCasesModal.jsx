import React, { useRef } from 'react';
import {
  TMButton,
  TMModal,
  TMModalBody,
  TMModalFooter,
  TMModalHeader
} from 'common/bifrostProxy';

import { BULK_OPERATIONS } from '../const/immutableConst';

import useBulkFunctions from './useBulkFunctions';

const AssignTestCasesModal = () => {
  const { addResultOnHandler, bulkOperationSelected, resetBulkOperation } =
    useBulkFunctions();
  const statusFocusRef = useRef();

  return (
    <TMModal
      ref={statusFocusRef}
      show={bulkOperationSelected === BULK_OPERATIONS.ASSIGN_TO.option}
      withDismissButton
      onOverlayClick={resetBulkOperation}
    >
      <TMModalHeader
        heading="Assign Test Cases"
        subHeading=""
        handleDismissClick={resetBulkOperation}
      />
      <TMModalBody>
        <div className="w-full">WIP</div>
      </TMModalBody>
      <TMModalFooter position="right">
        <TMButton variant="primary" colors="white" onClick={resetBulkOperation}>
          Cancel
        </TMButton>
        <TMButton
          variant="primary"
          colors="brand"
          wrapperClassName="ml-3"
          onClick={addResultOnHandler}
        >
          Assign
        </TMButton>
      </TMModalFooter>
    </TMModal>
  );
};

AssignTestCasesModal.propTypes = {};

AssignTestCasesModal.defaultProps = {};

export default AssignTestCasesModal;
