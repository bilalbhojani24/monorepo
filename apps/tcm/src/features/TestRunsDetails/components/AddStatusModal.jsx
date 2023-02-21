import React from 'react';
import AddIssuesModal from 'common/AddIssuesModal';
import {
  TMButton,
  TMModal,
  TMModalBody,
  TMModalFooter,
  TMModalHeader,
  TMRichTextEditor,
  TMSelectMenu
} from 'common/bifrostProxy';

import { STATUS_OPTIONS } from '../const/immutableConst';

import useTRTCFolders from './useTRTCFolders';

const AddStatusModal = () => {
  const {
    projectId,
    isAddIssuesModalShown,
    issuesArray,
    addStatusFormData,
    isAddStatusVisible,
    showAddIssueModal,
    statusFormChangeHandler,
    addStatusOkHandler,
    closeAll,
    hideAddIssueModal,
    addIssuesSaveHelper
  } = useTRTCFolders();

  return (
    <TMModal
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
          <div className="mb-4 max-w-xs">
            <TMSelectMenu
              label="Status"
              placeholder="Choose from options"
              options={STATUS_OPTIONS}
              value={
                addStatusFormData?.status &&
                STATUS_OPTIONS.find(
                  (item) => item.value === addStatusFormData.status
                )
              }
              onChange={(e) => statusFormChangeHandler('status', e?.value)}
            />
          </div>
          <div className="mb-4">
            <TMRichTextEditor
              label="Add Remarks"
              value={addStatusFormData?.description}
              height={200}
              placeholder="Enter your remarks about the test (if any)"
              onChange={(val) => statusFormChangeHandler('description', val)}
              projectId={projectId}
            />
          </div>
          <div className="flex flex-1 items-end justify-between pb-2">
            <div className="mr-4 flex-1">
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
