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
    openTestCasesModal
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
                  value={testRunFormData?.name}
                  id="test-run-name"
                  label="Test Run Name*"
                  onChange={handleTestRunInputFieldChange('test_run', 'name')}
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
                      name: '0 Test Cases',
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
                value={testRunFormData?.description}
                height={200}
                placeholder="Explaining in brief about the test run description"
                onChange={(val) =>
                  handleTestRunInputFieldChange('description', val)
                }
                // onAssetUpload={imageUploadRTEHelper}
              />
            </div>
            <div className="mt-4 flex gap-4">
              <div className="w-2/4">
                <TMSelectMenu
                  defaultValue={ASSIGN_TO_OPTIONS[0]}
                  checkPosition="right"
                  label="Assign To"
                  isMultiSelect
                  options={ASSIGN_TO_OPTIONS}
                  onChange={handleTestRunInputFieldChange(
                    'test_run',
                    'assignTo'
                  )}
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
                      value={testRunFormData?.tags}
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
                  defaultValue={STATE_OPTIONS[0]}
                  checkPosition="right"
                  label="State"
                  options={STATE_OPTIONS}
                  onChange={handleTestRunInputFieldChange('test_run', 'state')}
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
                      value={testRunFormData?.issues}
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
