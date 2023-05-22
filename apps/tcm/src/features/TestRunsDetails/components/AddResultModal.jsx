import React, { useRef } from 'react';
import AddIssuesModal from 'common/AddIssuesModal';
import {
  TMButton,
  TMModal,
  TMModalBody,
  TMModalFooter,
  TMModalHeader,
  // TMRichTextEditor,
  TMSelectMenu
} from 'common/bifrostProxy';

import { STATUS_OPTIONS } from '../const/immutableConst';

import useTRTCFolders from './useTRTCFolders';

const AddStatusModal = () => {
  const {
    statusError,
    // projectId,
    isAddIssuesModalShown,
    issuesArray,
    addStatusFormData,
    isAddStatusVisible,
    showAddIssueModal,
    statusFormChangeHandler,
    addStatusOkHandler,
    closeAll,
    hideAddIssueModal,
    addIssuesSaveHelper,
    setStatusError
  } = useTRTCFolders();
  const statusFocusRef = useRef();

  return (
    <TMModal
      ref={statusFocusRef}
      show={isAddStatusVisible}
      withDismissButton
      onOverlayClick={closeAll}
    >
      <TMModalHeader
        heading="Add Status"
        subHeading=""
        handleDismissClick={closeAll}
      />
      <TMModalBody>
        <div className="w-full">
          <div className="mb-4 w-72">
            <TMSelectMenu
              label="Status"
              checkPosition="right"
              ref={statusFocusRef}
              placeholder="Choose from options"
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
              value={
                addStatusFormData?.status &&
                STATUS_OPTIONS.find(
                  (item) => item.value === addStatusFormData.status
                )
              }
              onChange={(e) => {
                if (statusError) setStatusError(false);
                statusFormChangeHandler('status', e?.value);
              }}
            />
            {statusError && (
              <p className="text-danger-600 mt-1 text-sm">
                This is a required field
              </p>
            )}
          </div>
          {/* <div className="mb-4">
            <TMRichTextEditor
              label="Add Remarks"
              value={addStatusFormData?.description}
              height={200}
              placeholder="Enter your remarks about the test (if any)"
              onChange={(val) => statusFormChangeHandler('description', val)}
              projectId={projectId}
            />
          </div> */}
          <div className="flex flex-1 items-end justify-between pb-2">
            <div className="mr-4 w-72">
              <TMSelectMenu
                checkPosition="right"
                isMulti
                placeholder="Select from options"
                label="Issues"
                options={issuesArray}
                value={addStatusFormData?.issues}
                onChange={(e) => statusFormChangeHandler('issues', e)}
              />
            </div>
            <TMButton
              wrapperClassName=""
              colors="white"
              onClick={showAddIssueModal}
            >
              Add / Modify Issue
            </TMButton>
          </div>
        </div>
      </TMModalBody>
      <TMModalFooter position="right">
        <TMButton variant="primary" colors="white" onClick={closeAll}>
          Cancel
        </TMButton>
        <TMButton
          variant="primary"
          colors="brand"
          wrapperClassName="ml-3"
          onClick={addStatusOkHandler}
        >
          Add Result
        </TMButton>
      </TMModalFooter>
      <AddIssuesModal
        isVisible={isAddIssuesModalShown}
        onClose={hideAddIssueModal}
        onSave={addIssuesSaveHelper}
      />
    </TMModal>
  );
};

AddStatusModal.propTypes = {};

AddStatusModal.defaultProps = {};

export default AddStatusModal;
