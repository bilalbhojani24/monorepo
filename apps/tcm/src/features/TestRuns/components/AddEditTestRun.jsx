import React, { useEffect } from 'react';
import AddIssuesModal from 'common/AddIssuesModal';
import AddTagModal from 'common/AddTagModal';
import {
  TMAttachments,
  TMButton,
  TMComboBox,
  TMInputField,
  TMPageHeadings,
  TMRichTextEditor,
  TMSelectMenu
} from 'common/bifrostProxy';

import { STATE_OPTIONS } from '../const/addEditConst';

import useAddEditTestRun from './useAddEditTestRun';
import useTestRuns from './useTestRuns';

const AddEditTestRun = () => {
  const {
    inputError,
    isAddTagModalShown,
    isAddIssuesModalShown,
    usersArrayMapped,
    tagsArray,
    issuesArray,
    testRunFormData,
    createTestRunHandler,
    cancelCreation,
    handleTestRunInputFieldChange,
    showAddTagsModal,
    showAddIssuesModal,
    showTestCasesModal,
    hideAddIssuesModal,
    hideAddTagsModal,
    imageUploadRTEHelper,
    tagVerifierFunction,
    addIssuesSaveHelper
  } = useAddEditTestRun();

  const { initFormValues } = useTestRuns();

  useEffect(() => {
    initFormValues();

    // return () => {
    //   hideTestCaseAddEditPage(null, true);
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                  errorText={inputError ? "This field can't be left empty" : ''}
                  label="Test Run Name*"
                  onChange={(e) =>
                    handleTestRunInputFieldChange('name', e.currentTarget.value)
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
                  onActionClick={showTestCasesModal}
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
                      ? usersArrayMapped.find(
                          (item) =>
                            item.value === testRunFormData?.test_run?.owner
                        )
                      : { label: '', value: '' } // to be updated to null
                  }
                  options={usersArrayMapped}
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
                    handleTestRunInputFieldChange('run_state', e.value)
                  }
                />
              </div>
              <div className="w-2/4">
                <div className="flex flex-1 items-end justify-between">
                  <div className="mr-4 flex-1">
                    <TMSelectMenu
                      checkPosition="right"
                      isMultiSelect
                      placeholder="Select from options"
                      label="Issues"
                      options={issuesArray}
                      value={testRunFormData?.test_run?.issues}
                      onChange={(e) =>
                        handleTestRunInputFieldChange('issues', e)
                      }
                    />
                  </div>
                  <TMButton
                    wrapperClassName=""
                    colors="white"
                    onClick={showAddIssuesModal}
                  >
                    Add New Issue
                  </TMButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddTagModal
        isVisible={isAddTagModalShown}
        onClose={hideAddTagsModal}
        existingTags={
          testRunFormData?.test_run?.tags?.map((item) => item.value) || []
        }
        verifierFunction={tagVerifierFunction}
      />
      <AddIssuesModal
        isVisible={isAddIssuesModalShown}
        onClose={hideAddIssuesModal}
        onSave={addIssuesSaveHelper}
      />
    </>
  );
};

export default AddEditTestRun;
