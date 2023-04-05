import React, { useEffect, useRef } from 'react';
import { MdOutlineDescription } from '@browserstack/bifrost';
import AddIssuesModal from 'common/AddIssuesModal';
import AddTagModal from 'common/AddTagModal';
import {
  TMAttachments,
  TMButton,
  TMComboBox,
  TMInputField,
  TMPageHeadings,
  TMSelectMenu,
  TMTextArea
} from 'common/bifrostProxy';
import PropTypes from 'prop-types';

import { STATE_OPTIONS_ALL, STATE_OPTIONS_NEW } from '../const/addEditConst';

import TestCasesExplorer from './TestCasesExplorer';
import useAddEditTestRun from './useAddEditTestRun';
import useTestRuns from './useTestRuns';

const AddEditTestRun = ({ isEdit }) => {
  const {
    projectId,
    inputError,
    isEditing,
    isAddTagModalShown,
    isAddIssuesModalShown,
    usersArrayMapped,
    tagsArray,
    issuesArray,
    testRunFormData,
    createTestRunHandler,
    handleTestRunInputFieldChange,
    showAddTagsModal,
    showAddIssuesModal,
    showTestCasesModal,
    hideAddIssuesModal,
    hideAddTagsModal,
    addIssuesSaveHelper,
    hideAddTestRunForm,
    cleanupActivities,
    onBreadcrumbClick,
    initTestRunFormData,
    updatedMySelfLabelName,
    createTestRunsCtaLoading,
    editTestRunsCtaLoading,
    handleMenuOpen
  } = useAddEditTestRun();

  const { initFormValues } = useTestRuns();
  const focusRef = useRef(null);
  useEffect(() => {
    initFormValues();

    if (isEdit) initTestRunFormData();

    focusRef?.current?.focus();
    return () => {
      cleanupActivities();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const defaultOwnerValue =
    !isEditing && usersArrayMapped?.length
      ? usersArrayMapped?.find((item) => item.label === updatedMySelfLabelName)
      : { label: '', value: '' };

  const STATE_OPTIONS = isEditing ? STATE_OPTIONS_ALL : STATE_OPTIONS_NEW;

  return (
    <>
      <div className="border-base-200 flex w-full flex-1 shrink-0 grow flex-col overflow-hidden border-l">
        <TMPageHeadings
          breadcrumbWrapperClassName=""
          onBreadcrumbClick={onBreadcrumbClick}
          breadcrumbs={[
            { name: 'Test Runs', isHome: true },
            { name: isEditing ? 'Edit' : 'Create' }
          ]}
          heading={isEditing ? 'Edit Test Run' : 'Create New Test Run'}
          actions={
            <>
              <TMButton
                variant="primary"
                colors="white"
                onClick={() => hideAddTestRunForm(null, 'Cancel')}
              >
                Cancel
              </TMButton>
              <TMButton
                wrapperClassName="ml-4"
                variant="primary"
                colors="brand"
                onClick={createTestRunHandler}
                loading={
                  isEditing ? editTestRunsCtaLoading : createTestRunsCtaLoading
                }
                isIconOnlyButton={
                  isEditing ? editTestRunsCtaLoading : createTestRunsCtaLoading
                }
              >
                {isEditing ? 'Update Run' : 'Create Run'}
              </TMButton>
            </>
          }
        />
        <div className="flex-1 overflow-y-auto">
          <div className="border-base-200 flex flex-1 flex-col justify-start overflow-hidden border-b bg-white p-4 sm:rounded-lg">
            <div className="w-2/4">
              <TMInputField
                value={testRunFormData?.test_run?.name}
                id="test-run-name"
                errorText={inputError ? 'This is a required field' : ''}
                label="Test Run Name*"
                ref={focusRef}
                placeholder="Enter test run name"
                onChange={(e) =>
                  handleTestRunInputFieldChange('name', e.currentTarget.value)
                }
              />
              <div className="mt-4">
                <div className="flex w-full justify-between">
                  <div className="text-base-700 mb-2 block text-sm font-medium">
                    Test Cases
                  </div>
                </div>
                <TMAttachments
                  icon={
                    <MdOutlineDescription className="text-base-500 h-5 w-5" />
                  }
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
              <TMTextArea
                label="Description"
                defaultValue={testRunFormData?.test_run?.description}
                placeholder="Write in brief about the test run"
                onChange={(e) => {
                  handleTestRunInputFieldChange(
                    'description',
                    e.currentTarget.value
                  );
                }}
                projectId={projectId}
              />
            </div>
            <div className="mt-4 flex gap-4">
              <div className="w-2/4">
                <TMComboBox
                  checkPosition="right"
                  label="Assign Run"
                  placeholder="Select from options"
                  value={
                    testRunFormData?.test_run?.owner
                      ? usersArrayMapped.find(
                          (item) =>
                            item.value === testRunFormData?.test_run?.owner
                        )
                      : defaultOwnerValue
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
                      value={testRunFormData?.test_run?.tags}
                      onChange={(e) => {
                        handleTestRunInputFieldChange('tags', e);
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
                  placeholder="Select from options"
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
                      isMulti
                      placeholder="Select from options"
                      label="Issues"
                      options={issuesArray}
                      value={testRunFormData?.test_run?.issues}
                      onChange={(e) =>
                        handleTestRunInputFieldChange('issues', e)
                      }
                      onOpenChange={(isMenuOpened) => {
                        handleMenuOpen('issues', isMenuOpened);
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddTagModal
        isVisible={isAddTagModalShown}
        onClose={hideAddTagsModal}
        selectedTags={
          testRunFormData?.test_run?.tags?.map((item) => item.value) || []
        }
        existingTags={tagsArray}
      />
      <AddIssuesModal
        isVisible={isAddIssuesModalShown}
        onClose={hideAddIssuesModal}
        onSave={addIssuesSaveHelper}
      />
      <TestCasesExplorer />
    </>
  );
};

AddEditTestRun.propTypes = {
  isEdit: PropTypes.bool
};

AddEditTestRun.defaultProps = {
  isEdit: false
};

export default AddEditTestRun;
