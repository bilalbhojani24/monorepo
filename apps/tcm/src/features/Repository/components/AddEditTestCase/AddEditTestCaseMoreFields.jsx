import React from 'react';
import {
  TMAttachments,
  TMButton,
  TMComboBox,
  TMFileUpload,
  TMRichTextEditor,
  TMSelectMenu
} from 'common/bifrostProxy';

import {
  priorityOptions,
  statusOptions,
  testCaseTypesOptions
} from '../../const/addTestCaseConst';

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
    showAddTagsModal,
    fileUploaderHelper,
    fileRemoveHandler,
    // tagVerifierFunction,
    showAddIssueModal,
    handleMenuOpen
  } = useAddEditTestCase({ isAddEditOnly: true });

  return (
    <>
      <div className="mt-4 flex gap-4">
        <div className="flex-1">
          <TMSelectMenu
            checkPosition="right"
            label="Type of Test Case"
            options={testCaseTypesOptions}
            onChange={(e) => handleTestCaseFieldChange('case_type', e.value)}
            value={
              testCaseFormData.case_type &&
              testCaseTypesOptions.find(
                (item) => item.value === testCaseFormData.case_type
              )
            }
          />
        </div>
        <div className="flex-1">
          <TMSelectMenu
            checkPosition="right"
            label="Priority"
            options={priorityOptions}
            value={
              testCaseFormData.priority &&
              priorityOptions.find(
                (item) => item.value === testCaseFormData.priority
              )
            }
            onChange={(e) => handleTestCaseFieldChange('priority', e.value)}
          />
        </div>
      </div>

      <div className="mt-4 flex gap-4">
        <div className="flex-1">
          <TMSelectMenu
            value={
              testCaseFormData.status &&
              statusOptions.find(
                (item) => item.value === testCaseFormData.status
              )
            }
            checkPosition="right"
            label="State"
            options={statusOptions}
            onChange={(e) => handleTestCaseFieldChange('status', e.value)}
          />
        </div>
        <div className="flex-1">
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
      <div className="mt-4 flex gap-4">
        {/* <div className="flex-1">
      <TMInputField
        id="test-case-estimate"
        value={testCaseFormData?.estimate}
        label={
          <div className="flex items-center">
            Estimate
            <TMTooltip
              size="xs"
              placementSide="bottom"
              theme="dark"
              content={
                <>
                  <TMTooltipHeader>Estimate</TMTooltipHeader>
                  <TMTooltipBody>
                    <p className="pb-5 text-sm">
                      You can define an estimate of testing time you
                      would require for this test case. Below format
                      types are permitted:
                    </p>
                    <ul className="list-disc pl-5 pb-5 text-sm">
                      <li>Seconds (s)</li>
                      <li>Minutes (m)</li>
                      <li>Hours (h)</li>
                      <li>Minutes:Seconds (m:s)</li>
                      <li>Hours:Minutes:Seconds (h:m:s)</li>
                    </ul>
                    <p className="text-sm">
                      Combination of above options are permitted. Eg:
                      &quot;2d 3h&quot;, &quot;5m 30s&quot;,
                      &quot;10m&quot;.
                    </p>
                  </TMTooltipBody>
                </>
              }
            >
              <InfoOutlinedIcon className="ml-1 !h-3.5 !w-3.5" />
            </TMTooltip>
          </div>
        }
        placeholder="Eg: 1m, 2.5h, 2d etc"
        onChange={(e) =>
          handleTestCaseFieldChange('estimate', e.currentTarget.value)
        }
      />
    </div> */}
        <div className="flex flex-1 items-end justify-between">
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

        <div className="flex flex-1 items-end justify-between">
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
      </div>
      {/* <div className="mt-4 flex gap-4">
    <div className="flex-1" />
  </div> */}
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
            multiple
            wrapperClassName="w-64 h-36"
            heading=""
            linkText="Upload a file"
            subHeading="PNG, JPG, DOC, PDF, CSV, MP4 up to 50 MB"
            onChange={fileUploaderHelper}
            accept="application/pdf, image/jpeg, image/png, .doc, .docx, text/csv, video/mp4"
          />
        </div>
        <div className="flex-1" />
      </div>
    </>
  );
};

export default AddEditTestCaseMoreFields;
