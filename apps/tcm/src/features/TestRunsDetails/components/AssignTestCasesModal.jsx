import React, { useRef } from 'react';
import {
  TMAlerts,
  TMButton,
  TMModal,
  TMModalBody,
  TMModalFooter,
  TMModalHeader,
  TMSelectMenu
} from 'common/bifrostProxy';
import Loader from 'common/Loader';

import { BULK_OPERATIONS } from '../const/immutableConst';

import useBulkFunctions from './useBulkFunctions';

const AssignTestCasesModal = () => {
  const {
    isUsersArrayLoading,
    onAssignHandler,
    usersArray,
    bulkOperationSelected,
    resetBulkOperation
  } = useBulkFunctions();
  const statusFocusRef = useRef();

  return (
    <TMModal
      size="md"
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
      <TMModalBody className="h-32">
        {isUsersArrayLoading ? (
          <Loader />
        ) : (
          <div className="w-full">
            <TMSelectMenu
              label="Assign to"
              placeholder="Choose from options"
              triggerWrapperClassName="mb-4 w-56"
              checkPosition="right"
              options={usersArray || []}
              // onChange={handleValueMappingMenuChange(actualName, value)}
            />
            <TMAlerts
              show
              description="The test cases will be assigned to Tim Cook"
              modifier="primary"
            />
          </div>
        )}
      </TMModalBody>
      <TMModalFooter position="right">
        <TMButton variant="primary" colors="white" onClick={resetBulkOperation}>
          Cancel
        </TMButton>
        <TMButton
          variant="primary"
          colors="brand"
          wrapperClassName="ml-3"
          onClick={onAssignHandler}
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
