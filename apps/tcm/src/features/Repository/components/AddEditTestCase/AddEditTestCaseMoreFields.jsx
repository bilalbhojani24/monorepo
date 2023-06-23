import React from 'react';
import {
  TMAttachments,
  TMButton,
  TMComboBox,
  TMFileUpload,
  TMRichTextEditor,
  TMSelectMenu,
  TMTooltip,
  TMTooltipBody
} from 'common/bifrostProxy';

import AddEditTestCaseCustomField from './AddEditTestCaseCustomField';
import useAddEditTestCase from './useAddEditTestCase';

const AddEditTestCaseMoreFields = () => {
  const {
    projectId,
    isUploadInProgress,
    handleTestCaseFieldChange,
    testCaseFormData,
    usersArrayMapped,
    tagsArray,
    issuesArray,
    priorityOptions,
    statusOptions,
    testCaseTypeOptions,
    automationOptions,
    showAddTagsModal,
    fileUploaderHelper,
    fileRemoveHandler,
    showAddIssueModal,
    handleMenuOpen
  } = useAddEditTestCase({ isAddEditOnly: true });

  return (
    <>
      <div className="mt-4 flex">
        <div className="w-1/2 flex-1 pr-2">
          <TMSelectMenu
            checkPosition="right"
            label="Type of Test Case*"
            placeholder="Select type of test case"
            options={testCaseTypeOptions}
            onChange={(e) => handleTestCaseFieldChange('case_type', e.value)}
            value={
              testCaseFormData.case_type &&
              testCaseTypeOptions?.find(
                (item) => item.value === testCaseFormData.case_type
              )
            }
          />
        </div>
        <div className="w-1/2 flex-1 pl-2">
          <TMTooltip
            size="xs"
            triggerWrapperClassName="w-full"
            placementSide="top"
            theme="dark"
            isForcedHidden={!testCaseFormData?.is_automation}
            wrapperClassName="w-full translate-y-7"
            content={
              <TMTooltipBody wrapperClassName="w-64">
                You are not allowed to change automation status for test cases
                that are generated from automation pipeline
              </TMTooltipBody>
            }
          >
            <TMSelectMenu
              checkPosition="right"
              label="Automation Status*"
              disabled={testCaseFormData?.is_automation}
              placeholder="Select automation status"
              options={automationOptions}
              onChange={(e) =>
                handleTestCaseFieldChange('automation_status', e.value)
              }
              value={
                testCaseFormData.automation_status &&
                automationOptions.find(
                  (item) => item.value === testCaseFormData.automation_status
                )
              }
            />
          </TMTooltip>
        </div>
      </div>

      <div className="mt-4 flex">
        <div className="w-1/2 flex-1 pr-2">
          <TMSelectMenu
            checkPosition="right"
            label="Priority"
            placeholder="Select priority"
            options={priorityOptions}
            value={
              testCaseFormData.priority &&
              priorityOptions?.find(
                (item) => item.value === testCaseFormData?.priority
              )
            }
            onChange={(e) => handleTestCaseFieldChange('priority', e.value)}
          />
        </div>
        <div className="w-1/2 flex-1 pl-2">
          <TMSelectMenu
            value={
              testCaseFormData.status &&
              statusOptions?.find(
                (item) => item.value === testCaseFormData?.status
              )
            }
            checkPosition="right"
            label="State"
            placeholder="Select state"
            options={statusOptions}
            onChange={(e) => handleTestCaseFieldChange('status', e.value)}
          />
        </div>
      </div>
      <div className="mt-4 flex">
        <div className="w-1/2 flex-1 pr-2">
          <TMComboBox
            value={
              testCaseFormData.owner
                ? usersArrayMapped?.find(
                    (item) => item.value === testCaseFormData.owner
                  )
                : null
            }
            isMulti={false}
            placeholder="Select owner"
            checkPosition="right"
            label="Owner"
            options={usersArrayMapped}
            onChange={(e) => handleTestCaseFieldChange('owner', e.value)}
          />
        </div>
        <div className="flex flex-1 items-end justify-between pl-2">
          <div className="mr-4 flex-1">
            <TMComboBox
              checkPosition="right"
              isMulti
              placeholder="Select from options"
              label="Tags"
              options={tagsArray}
              value={testCaseFormData?.tags}
              onChange={(e) => {
                handleTestCaseFieldChange('tags', e);
              }}
              onOpenChange={(isMenuOpened) => {
                handleMenuOpen('tags', isMenuOpened);
              }}
            />
          </div>
          <TMButton
            wrapperClassName=""
            colors="white"
            onClick={showAddTagsModal}
          >
            Add / Modify Tag
          </TMButton>
        </div>
      </div>
      <div className="mt-4 flex">
        <div className="flex flex-1 items-end justify-between pr-2">
          <div className="mr-4 flex-1">
            <TMComboBox
              checkPosition="right"
              isMulti
              placeholder="Select from options"
              label="Issues"
              options={issuesArray}
              value={testCaseFormData?.issues}
              onChange={(e) => handleTestCaseFieldChange('issues', e)}
              onOpenChange={(isMenuOpened) => {
                handleMenuOpen('issues', isMenuOpened);
              }}
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
        <div className="flex-1  pl-2" />
      </div>
      <div className="mt-4">
        <TMRichTextEditor
          id="preconnditions-rte"
          placeholder="Enter preconditions needed before executing this test"
          label="Preconditions"
          value={testCaseFormData?.preconditions}
          height={160}
          onChange={(val) =>
            handleTestCaseFieldChange('preconditions', val, true)
          }
          projectId={projectId}
        />
      </div>
      <AddEditTestCaseCustomField />
      <div className="mt-4 w-full">
        <div className="flex flex-col">
          <div className="flex w-full justify-between">
            <div className="text-base-700 mb-2 block text-sm font-medium">
              Attachments
            </div>
          </div>
          {testCaseFormData?.attachments?.length ? (
            <div className="mb-4">
              <TMAttachments
                attachments={
                  testCaseFormData?.attachments.map((item) => ({
                    ...item,
                    actionName: 'Remove'
                  })) || []
                }
                onActionClick={fileRemoveHandler}
              />
            </div>
          ) : (
            ''
          )}
          <TMFileUpload
            isUploading={isUploadInProgress}
            // multiple
            wrapperClassName="w-72 h-36"
            heading=""
            linkText="Upload a file"
            subHeading="PNG, JPG, PDF, CSV, MP4 up to 50 MB"
            onChange={fileUploaderHelper}
            accept="application/pdf image/webp video/webm text/plain image/tiff image/svg+xml video/ogg image/jpeg image/png image/avif video/x-msvideo text/csv application/msword"
            // accept="application/pdf, image/jpeg, image/png, text/csv, video/mp4"
          />
        </div>
        <div className="flex-1" />
      </div>
    </>
  );
};

export default AddEditTestCaseMoreFields;
