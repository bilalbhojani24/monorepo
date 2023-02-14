import React from 'react';
import {
  TMAttachments,
  TMButton,
  TMComboBox,
  TMInputField,
  TMPageHeadings,
  TMRichTextEditor,
  TMSelectMenu
} from 'common/bifrostProxy';

import { ASSIGN_TO_OPTIONS, STATE_OPTIONS } from '../const/addEditConst';

import useAddEditTestRun from './useAddEditTestRun';

const AddEditTestRun = () => {
  const {
    tagsArray,
    issuesArray,
    testRunFormData,
    createTestRunHandler,
    cancelCreation,
    handleTestRunInputFieldChange,
    showAddTagsModal,
    showAddIssueModal,
    openTestCasesModal,
    imageUploadRTEHelper
  } = useAddEditTestRun();

  return (
    <>
      <div className="border-base-200 flex w-full flex-1 shrink-0 grow flex-col overflow-hidden border-l">
        <TMPageHeadings
          breadcrumbs={[{ name: 'Test Runs' }, { name: 'Create' }]}
          heading="Create New Test Runs"
          actions={
            <>
              <TMButton
                variant="primary"
                colors="white"
                onClick={cancelCreation}
              >
                Cancel
              </TMButton>
              <TMButton
                wrapperClassName="ml-4"
                variant="primary"
                colors="brand"
                onClick={createTestRunHandler}
              >
                Create Run
              </TMButton>
            </>
          }
        />
        <div className="flex-1 overflow-y-auto">
          <div className="border-base-200 flex flex-1 flex-col justify-start overflow-hidden border-b bg-white p-4 sm:rounded-lg">
            <div className="w-2/4">
              <div className="mt-4">
                <TMInputField
                  value={testRunFormData?.test_run?.name}
                  id="test-run-name"
                  label="Test Run Name*"
                  onChange={(e) =>
                    handleTestRunInputFieldChange(
                      'test_run',
                      e.currentTarget.value
                    )
                  }
                />
              </div>
              <div className="mt-4">
                <div className="flex w-full justify-between">
                  <div className="text-base-700 mb-2 block text-sm font-medium">
                    Test Cases
                  </div>
                </div>
                <TMAttachments
                  attachments={[
                    {
                      name: `${
                        testRunFormData?.test_case_ids?.length || 0
                      } Test Cases`,
                      actionName: 'Select Test Cases'
                    }
                  ]}
                  onActionClick={openTestCasesModal}
                />
              </div>
            </div>
            <div className="mt-4">
              <TMRichTextEditor
                label="Description"
                value={testRunFormData?.test_run?.description}
                height={200}
                placeholder="Explaining in brief about the test run description"
                onChange={(val) =>
                  handleTestRunInputFieldChange('description', val)
                }
                onAssetUpload={imageUploadRTEHelper}
              />
            </div>
            <div className="mt-4 flex gap-4">
              <div className="w-2/4">
                <TMComboBox
                  checkPosition="right"
                  label="Assign To"
                  value={
                    testRunFormData?.test_run?.owner
                      ? ASSIGN_TO_OPTIONS.find(
                          (item) =>
                            item.value === testRunFormData?.test_run?.owner
                        )
                      : { label: '', value: '' } // to be updated to null
                  }
                  options={ASSIGN_TO_OPTIONS}
                  onChange={(e) =>
                    handleTestRunInputFieldChange('owner', e.value)
                  }
                />
              </div>
              <div className="w-2/4">
                <div className="flex flex-1 items-end justify-between">
                  <div className="mr-4 flex-1">
                    <TMComboBox
                      checkPosition="right"
                      isMulti
                      placeholder="Select from options"
                      label="Tags"
                      options={tagsArray}
                      value={
                        testRunFormData?.test_run?.tags
                          ? tagsArray.find(
                              (item) =>
                                item.value === testRunFormData?.test_run?.tags
                            )
                          : { label: '', value: '' } // to be updated to null
                      }
                      onChange={(e) => {
                        handleTestRunInputFieldChange('tags', e);
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
            </div>
            <div className="mt-4 flex gap-4">
              <div className="w-2/4">
                <TMSelectMenu
                  value={
                    testRunFormData?.test_run?.run_state &&
                    STATE_OPTIONS.find(
                      (item) =>
                        item.value === testRunFormData?.test_run?.run_state
                    )
                  }
                  checkPosition="right"
                  label="State"
                  options={STATE_OPTIONS}
                  onChange={(e) =>
                    handleTestRunInputFieldChange('test_run', e.value)
                  }
                />
              </div>
              <div className="w-2/4">
                <div className="flex flex-1 items-end justify-between">
                  <div className="mr-4 flex-1">
                    <TMComboBox
                      checkPosition="right"
                      isMulti
                      placeholder="Select from options"
                      label="Issues"
                      options={issuesArray}
                      value={
                        testRunFormData?.test_run?.issues
                          ? issuesArray.find(
                              (item) =>
                                item.value === testRunFormData?.test_run?.issues
                            )
                          : { label: '', value: '' } // to be updated to null
                      }
                      onChange={(e) =>
                        handleTestRunInputFieldChange('issues', e)
                      }
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEditTestRun;
