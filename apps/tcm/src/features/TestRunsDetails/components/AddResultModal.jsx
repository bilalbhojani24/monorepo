import React, { useRef } from 'react';
import { twClassNames } from '@browserstack/utils';
import {
  TMButton,
  TMModal,
  TMModalBody,
  TMModalFooter,
  TMModalHeader,
  TMSelectMenu
} from 'common/bifrostProxy';

import { BULK_OPERATIONS, STATUS_OPTIONS } from '../const/immutableConst';

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
        <div className="w-full">
          <TMSelectMenu
            placeholder="Not Started"
            checkPosition="right"
            triggerWrapperClassName={twClassNames('w-72')}
            options={STATUS_OPTIONS.map((el) => ({
              label: (
                <div>
                  <div
                    className={`${el.class} m-auto mx-2 inline-block h-2 w-2 flex-1 rounded-full`}
                    style={{ backgroundColor: el.color ? el.color : 'auto' }}
                  />
                  <span className="inline-block">{el.label}</span>
                </div>
              ),
              value: el.value
            }))}
            // value={valueMapped}
            // onChange={(e) => onResultChange(e, rowData, true, true)}
          />
        </div>
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
