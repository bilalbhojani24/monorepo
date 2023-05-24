import React, { useRef } from 'react';
import { twClassNames } from '@browserstack/utils';
import AddIssuesModal from 'common/AddIssuesModal/components/AddIssuesModal';
import {
  // TMBadgeComboBox,
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
  const {
    showAddIssuesModal,
    isShowAddIssuesModal,
    hideAddIssuesModal,
    saveAddIssesModal,
    resultForm,
    resultIssuesArray,
    isBulkAddResultInProgress,
    onAddResultHandler,
    bulkOperationSelected,
    resetBulkOperation,
    onResultChange,
    handleMenuOpen
  } = useBulkFunctions();
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
            placeholder=""
            label="Status"
            defaultValue={{
              label: (
                <div>
                  <div
                    className={`${STATUS_OPTIONS[0].class} m-auto mx-2 inline-block h-2 w-2 flex-1 rounded-full`}
                    style={{
                      backgroundColor: STATUS_OPTIONS[0].color
                        ? STATUS_OPTIONS[0].color
                        : 'auto'
                    }}
                  />
                  <span className="inline-block">
                    {STATUS_OPTIONS[0].label}
                  </span>
                </div>
              ),
              value: STATUS_OPTIONS[0].value
            }}
            checkPosition="right"
            triggerWrapperClassName={twClassNames('w-72 mb-4')}
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
            onChange={(val) => onResultChange('status', val.value)}
          />

          <div className="mb-1 flex flex-1 items-end justify-between">
            <div className="mr-4 flex-1">
              <TMSelectMenu
                checkPosition="right"
                isMulti
                placeholder="Select from options"
                label="Issues"
                options={resultIssuesArray}
                value={
                  resultForm.jiraIssues &&
                  resultIssuesArray?.filter((item) =>
                    resultForm?.jiraIssues?.includes?.(item.value)
                  )
                }
                onChange={(val) =>
                  onResultChange(
                    'jiraIssues',
                    val?.map((item) => item?.value)
                  )
                }
                onOpenChange={(isMenuOpened) => {
                  handleMenuOpen(isMenuOpened);
                }}
              />
            </div>
            <TMButton
              wrapperClassName=""
              colors="white"
              onClick={showAddIssuesModal}
            >
              Add / Modify Issue
            </TMButton>
            <AddIssuesModal
              isVisible={isShowAddIssuesModal}
              onClose={hideAddIssuesModal}
              onSave={saveAddIssesModal}
            />
          </div>
          {/* <TMBadgeComboBox
            placeholder="Select from options"
            label={
              <div className="text-base-700 mb-1 block text-sm font-medium">
                Jira Issues
              </div>
            }
          /> */}
        </div>
      </TMModalBody>
      <TMModalFooter position="right">
        <TMButton variant="primary" colors="white" onClick={resetBulkOperation}>
          Cancel
        </TMButton>
        <TMButton
          loading={isBulkAddResultInProgress}
          isIconOnlyButton={isBulkAddResultInProgress}
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
