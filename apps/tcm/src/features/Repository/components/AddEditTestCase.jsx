/* eslint-disable tailwindcss/no-arbitrary-value */
import React, { useEffect } from 'react';
import { InfoOutlinedIcon } from 'assets/icons';
import AddIssuesModal from 'common/AddIssuesModal';
import AddTagModal from 'common/AddTagModal';
import {
  TMAttachments,
  TMButton,
  TMComboBox,
  TMFileUpload,
  TMInputField,
  TMSectionHeadings,
  TMSelectMenu,
  TMTextArea,
  TMTooltip,
  TMTooltipBody,
  TMTooltipHeader
} from 'common/bifrostProxy';

import {
  priorityOptions,
  statusOptions,
  templateOptions,
  testCaseTypesOptions
} from '../const/addTestCaseConst';

import StepComponent from './StepComponent';
import useAddEditTestCase from './useAddEditTestCase';

const AddEditTestCase = () => {
  const {
    isUploadInProgress,
    isAddIssuesModalShown,
    isAddTagModalShown,
    handleTestCaseFieldChange,
    inputError,
    testCaseFormData,
    hideTestCaseAddEditPage,
    saveTestCase,
    editTestCase,
    isTestCaseEditing,
    showMoreFields,
    setShowMoreFields,
    initFormValues,
    usersArrayMapped,
    tagsArray,
    issuesArray,
    showAddTagsModal,
    hideAddTagsModal,
    fileUploaderHelper,
    fileRemoveHandler,
    tagVerifierFunction,
    showAddIssueModal,
    hideAddIssueModal,
    addIssuesSaveHelper
  } = useAddEditTestCase();

  useEffect(() => {
    initFormValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="border-base-200 w-full border-l">
      <div className="p-4 pb-0">
        <TMSectionHeadings
          title={isTestCaseEditing ? 'Edit Test Case' : 'Create Test Case'}
          variant="buttons"
          secondaryButtonProps={{
            children: isTestCaseEditing ? 'Update' : 'Save',
            variant: 'primary',
            onClick: () => {
              if (isTestCaseEditing) editTestCase(testCaseFormData);
              else saveTestCase(testCaseFormData);
            }
          }}
          primaryButtonProps={{
            children: 'Cancel',
            variant: 'primary',
            colors: 'white',
            onClick: hideTestCaseAddEditPage
          }}
        />
      </div>
      <div className="max-h-[calc(100vh-14.2rem)] overflow-y-auto p-4 pt-0">
        <div className="my-4">
          <TMInputField
            id="test-case-name"
            label="Name of Test Case*"
            placeholder="Enter Test Case"
            value={testCaseFormData.name}
            onChange={(e) =>
              handleTestCaseFieldChange('name', e.currentTarget.value)
            }
            errorText={inputError ? "This field can't be left empty" : ''}
          />
        </div>
        <div className="w-60">
          <TMSelectMenu
            checkPosition="right"
            label="Choose Template*"
            options={templateOptions}
            value={
              testCaseFormData.template &&
              templateOptions.find(
                (item) => item.value === testCaseFormData.template
              )
            }
            onChange={(e) => handleTestCaseFieldChange('template', e.value)}
          />
        </div>
        {testCaseFormData.template === templateOptions[0].value ? (
          <>
            <div className="mt-4">
              <TMTextArea
                value={testCaseFormData?.steps?.[0]}
                id="test-case-steps"
                label="Steps"
                placeholder="Steps of the test"
                onChange={(e) =>
                  // BE expects string in an array
                  handleTestCaseFieldChange('steps', [e.currentTarget.value])
                }
              />
            </div>
            <div className="mt-4">
              <TMTextArea
                value={testCaseFormData.expected_result}
                id="test-case-expected-results"
                label="Expected Results"
                placeholder="Write in brief about this test case"
                onChange={(e) =>
                  handleTestCaseFieldChange(
                    'expected_result',
                    e.currentTarget.value
                  )
                }
              />
            </div>
          </>
        ) : (
          <StepComponent
            data={testCaseFormData.steps}
            onChange={(data) => handleTestCaseFieldChange('steps', data)}
          />
        )}
        <div className="w-full">
          <TMButton
            onClick={() => setShowMoreFields(!showMoreFields)}
            fullWidth
            wrapperClassName="mt-4"
          >
            Show {showMoreFields ? 'Less' : 'More'} Fields
          </TMButton>
        </div>

        {showMoreFields && (
          <>
            <div className="mt-4 flex gap-4">
              <div className="flex-1">
                <TMSelectMenu
                  checkPosition="right"
                  label="Type of Test Case"
                  options={testCaseTypesOptions}
                  onChange={(e) =>
                    handleTestCaseFieldChange('case_type', e.value)
                  }
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
                  label="Priority*"
                  options={priorityOptions}
                  value={
                    testCaseFormData.priority &&
                    priorityOptions.find(
                      (item) => item.value === testCaseFormData.priority
                    )
                  }
                  onChange={(e) =>
                    handleTestCaseFieldChange('priority', e.value)
                  }
                />
              </div>
            </div>
            <div className="mt-4">
              <TMTextArea
                value={testCaseFormData.description}
                id="test-case-description"
                label="Description"
                placeholder="Write in brief about this test case"
                onChange={(e) =>
                  handleTestCaseFieldChange(
                    'description',
                    e.currentTarget.value
                  )
                }
              />
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
                <TMSelectMenu
                  value={
                    testCaseFormData.owner &&
                    usersArrayMapped?.find(
                      (item) => item.value === testCaseFormData.owner
                    )
                  }
                  placeholder="Select owner"
                  checkPosition="right"
                  label="Owner"
                  options={usersArrayMapped}
                  onChange={(e) => handleTestCaseFieldChange('owner', e.value)}
                />
              </div>
            </div>
            <div className="mt-4">
              <TMTextArea
                value={testCaseFormData.preconditions}
                placeholder="Mention preconditions if any needed before executing this test"
                id="test-case-preconditions"
                label="Preconditions"
                onChange={(e) =>
                  handleTestCaseFieldChange(
                    'preconditions',
                    e.currentTarget.value
                  )
                }
              />
            </div>
            <div className="mt-4 flex gap-4">
              <div className="flex-1">
                <TMInputField
                  id="test-case-estimate"
                  value={testCaseFormData.estimate}
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
                              <p className="text-sm">
                                You can define an estimate time you would
                                require for this test case. Below format types
                                are permitted:
                              </p>
                              <ul className="list-disc pl-5 text-sm">
                                <li>Seconds (s)</li>
                                <li>Minutes (m)</li>
                                <li>Hours (h)</li>
                                <li>Minutes:Seconds (m:s)</li>
                                <li>Hours:Minutes:Seconds (h:m:s)</li>
                              </ul>
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
              </div>
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
                  />
                </div>
                <TMButton
                  wrapperClassName=""
                  colors="white"
                  onClick={showAddTagsModal}
                >
                  Add New Tag
                </TMButton>
              </div>
            </div>
            <div className="mt-4 flex gap-4">
              <div className="flex flex-1 items-end justify-between">
                <div className="mr-4 flex-1">
                  <TMSelectMenu
                    checkPosition="right"
                    isMultiSelect
                    placeholder="Select from options"
                    label="Issues"
                    options={issuesArray}
                    value={testCaseFormData?.issues}
                    onChange={(e) => handleTestCaseFieldChange('issues', e)}
                  />
                </div>
                <TMButton
                  wrapperClassName=""
                  colors="white"
                  onClick={showAddIssueModal}
                >
                  Add New Issue
                </TMButton>
              </div>
              <div className="flex-1" />
            </div>
            <div className="mt-4 w-full">
              <div className="flex flex-col">
                <div className="flex w-full justify-between">
                  <div className="text-base-700 mb-2 block text-sm font-medium">
                    Attachments
                  </div>
                </div>
                {testCaseFormData?.attachments.length ? (
                  <div className="mb-4">
                    <TMAttachments
                      attachments={testCaseFormData?.attachments || []}
                      onRemoveClick={fileRemoveHandler}
                    />
                  </div>
                ) : (
                  ''
                )}
                <TMFileUpload
                  isUploading={isUploadInProgress}
                  multiple
                  wrapperClassName="w-64 h-36"
                  heading="or drag and drop"
                  linkText="Upload a file"
                  subHeading="PNG, JPG, PDF up to 10MB"
                  onChange={fileUploaderHelper}
                  accept="application/pdf image/webp video/webm text/plain image/tiff image/svg+xml video/ogg image/jpeg image/png image/avif video/x-msvideo text/csv application/msword"
                />
              </div>
              <div className="flex-1" />
            </div>
          </>
        )}
      </div>

      <AddTagModal
        isVisible={isAddTagModalShown}
        onClose={hideAddTagsModal}
        existingTags={testCaseFormData?.tags?.map((item) => item.value) || []}
        verifierFunction={tagVerifierFunction}
      />
      <AddIssuesModal
        isVisible={isAddIssuesModalShown}
        onClose={hideAddIssueModal}
        onSave={addIssuesSaveHelper}
      />
    </div>
  );
};

export default AddEditTestCase;
