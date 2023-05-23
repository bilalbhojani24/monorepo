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
  const { onAddResultHandler, bulkOperationSelected, resetBulkOperation } =
    useBulkFunctions();
  const statusFocusRef = useRef();

  return (
    <TMModal
      size="md"
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
          // loading={isBulkRemoveInProgress}
          // isIconOnlyButton={isBulkRemoveInProgress}
          variant="primary"
          colors="brand"
          wrapperClassName="ml-3"
          onClick={onAddResultHandler}
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
