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

const AddResultModal = () => {
  const { addResultOnHandler, bulkOperationSelected, resetBulkOperation } =
    useBulkFunctions();
  const statusFocusRef = useRef();

  return (
    <TMModal
      ref={statusFocusRef}
      show={bulkOperationSelected === BULK_OPERATIONS.ADD_RESULT.option}
      withDismissButton
      onOverlayClick={resetBulkOperation}
    >
      <TMModalHeader
        heading="Add Result"
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
          Add Result
        </TMButton>
      </TMModalFooter>
    </TMModal>
  );
};

AddResultModal.propTypes = {};

AddResultModal.defaultProps = {};

export default AddResultModal;
