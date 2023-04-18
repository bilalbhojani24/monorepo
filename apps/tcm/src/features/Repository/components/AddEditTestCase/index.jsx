/* eslint-disable tailwindcss/no-arbitrary-value */
import React, { useEffect, useRef } from 'react';
import { MdFolderOpen } from '@browserstack/bifrost';
import {
  ExpandLessOutlinedIcon,
  ExpandMoreOutlinedIcon
  // InfoOutlinedIcon
} from 'assets/icons';
import AddIssuesModal from 'common/AddIssuesModal';
import AddTagModal from 'common/AddTagModal';
import {
  TMButton,
  TMInputField,
  TMRichTextEditor,
  TMSectionHeadings,
  TMSelectMenu,
  // TMTooltip,
  // TMTooltipBody,
  // TMTooltipHeader,
  TMTruncateText
} from 'common/bifrostProxy';

import { BDD, templateOptions } from '../../const/addTestCaseConst';
import StepComponent from '../StepComponent';
import UnsavedChanges from '../UnsavedChanges';
import useTestCases from '../useTestCases';

import AddEditTestCaseMoreFields from './AddEditTestCaseMoreFields';
import useAddEditTestCase from './useAddEditTestCase';

const AddEditTestCase = () => {
  const {
    isTagsLoading,
    scheduledFolder,
    projectId,
    isUploadInProgress,
    isAddIssuesModalShown,
    isAddTagModalShown,
    createTestCaseCtaLoading,
    editTestCaseCtaLoading,
    handleTestCaseFieldChange,
    inputError,
    testCaseFormData,
    hideTestCaseAddEditPage,
    saveTestCase,
    editTestCase,
    isTestCaseEditing,
    showMoreFields,
    setShowMoreFieldHelper,
    tagsArray,
    hideAddTagsModal,
    // tagVerifierFunction,
    hideAddIssueModal,
    addIssuesSaveHelper,
    testCaseEditingInit
  } = useAddEditTestCase({ isAddEditOnly: true });

  const { initFormValues } = useTestCases();
  const focusRef = useRef(null);

  useEffect(() => {
    initFormValues();
    focusRef?.current?.focus();
    return () => {
      hideTestCaseAddEditPage(null, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // only initiate test case details fetch if the tags are already loaded, else wait
    if (!isTagsLoading) testCaseEditingInit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTestCaseEditing, isTagsLoading]);

  return (
    <div className="border-base-200 flex w-full shrink-0 grow flex-col items-start overflow-hidden border-l">
      <div className="w-full p-4 pb-0">
        <TMSectionHeadings
          title={isTestCaseEditing ? 'Edit Test Case' : 'Create Test Case'}
          variant="buttons"
          trailingHeadNode={
            <div className="flex items-center justify-end">
              <TMButton
                colors="white"
                variant="primary"
                onClick={(e) => hideTestCaseAddEditPage(e, null, 'Cancel')}
              >
                Cancel
              </TMButton>
              <TMButton
                disabled={isUploadInProgress}
                wrapperClassName="ml-4 whitespace-nowrap"
                variant="primary"
                onClick={() => {
                  if (isTestCaseEditing) editTestCase(testCaseFormData);
                  else saveTestCase(testCaseFormData);
                }}
                isIconOnlyButton={
                  isTestCaseEditing
                    ? editTestCaseCtaLoading
                    : createTestCaseCtaLoading
                }
                loading={
                  isTestCaseEditing
                    ? editTestCaseCtaLoading
                    : createTestCaseCtaLoading
                }
              >
                {isTestCaseEditing ? 'Update Case' : 'Create Case'}
              </TMButton>
            </div>
          }
        />
      </div>
      <div className="w-full shrink grow overflow-y-auto p-4 pt-0">
        <div className="my-4 flex gap-4">
          <div className="w-3/4">
            <TMInputField
              id="test-case-name"
              label="Name of Test Case *"
              placeholder="Enter test case name"
              value={testCaseFormData.name}
              onChange={(e) =>
                handleTestCaseFieldChange('name', e.currentTarget.value)
              }
              ref={focusRef}
              errorText={inputError?.name ? 'This is a required field' : ''}
            />
            {scheduledFolder.length ? (
              <div className="mt-2.5 flex w-full">
                <MdFolderOpen className="text-base-500 h-4 !w-4 shrink-0" />
                <div className="text-base-500 ml-1 break-all text-xs">
                  <TMTruncateText
                    hidetooltipTriggerIcon
                    isFullWidthTooltip
                    headerTooltipProps={{
                      delay: 500
                    }}
                  >
                    {scheduledFolder?.map((item) => item?.name).join(' / ')}
                  </TMTruncateText>
                </div>
              </div>
            ) : null}
          </div>
          <div className="w-1/4">
            <TMSelectMenu
              checkPosition="right"
              label="Choose Template"
              options={templateOptions}
              value={
                (testCaseFormData.template &&
                  templateOptions.find(
                    (item) => item.value === testCaseFormData.template
                  )) ||
                templateOptions[0]
              }
              onChange={(e) => handleTestCaseFieldChange('template', e.value)}
            />
          </div>
        </div>
        <div className="mt-4">
          <TMRichTextEditor
            label="Description"
            id="main-description"
            value={testCaseFormData?.description}
            height={160}
            placeholder="Write in brief about this test case"
            onChange={(val) =>
              handleTestCaseFieldChange('description', val, true)
            }
            projectId={projectId}
          />
        </div>
        {testCaseFormData.template === templateOptions[0].value ||
        testCaseFormData.template === BDD ? (
          <>
            <div className="mt-4 flex gap-4">
              <div className="flex-1">
                <TMRichTextEditor
                  label="Steps"
                  id="steps-rte"
                  placeholder="Steps for the test"
                  value={testCaseFormData?.steps?.[0]}
                  height={160}
                  onChange={(val) =>
                    handleTestCaseFieldChange('steps', [val], true)
                  }
                  projectId={projectId}
                />
              </div>
              <div className="flex-1">
                <TMRichTextEditor
                  id="expected-results-rte"
                  label="Expected Results"
                  placeholder="Expected result(s) from above steps"
                  value={testCaseFormData?.expected_result}
                  height={160}
                  onChange={(val) =>
                    handleTestCaseFieldChange('expected_result', val, true)
                  }
                  projectId={projectId}
                />
              </div>
            </div>
          </>
        ) : (
          <StepComponent
            errorText={inputError?.steps ? 'This is a required field' : ''}
            data={testCaseFormData.steps}
            onChange={(data) => handleTestCaseFieldChange('steps', data, true)}
            projectId={projectId}
          />
        )}
        <div className="before:border-base-300 relative mb-6 mt-4 flex w-full justify-center before:absolute before:top-1/2 before:z-0 before:w-full before:border-b ">
          <TMButton
            onClick={() => setShowMoreFieldHelper(!showMoreFields)}
            colors="white"
            variant="rounded"
            wrapperClassName="w-44 relative pr-2 z-[1] bg-white"
            iconPlacement="end"
            icon={
              showMoreFields ? (
                <ExpandLessOutlinedIcon className="!h-4 !w-4" />
              ) : (
                <ExpandMoreOutlinedIcon className="!h-4 !w-4" />
              )
            }
          >
            Show {showMoreFields ? 'Less' : 'More'} Fields
          </TMButton>
        </div>

        {showMoreFields && <AddEditTestCaseMoreFields />}
      </div>

      <AddTagModal
        isVisible={isAddTagModalShown}
        onClose={hideAddTagsModal}
        existingTags={tagsArray}
        selectedTags={testCaseFormData?.tags?.map((item) => item.value) || []}
        // verifierFunction={tagVerifierFunction}
      />
      <AddIssuesModal
        isVisible={isAddIssuesModalShown}
        onClose={hideAddIssueModal}
        onSave={addIssuesSaveHelper}
      />
      <UnsavedChanges />
    </div>
  );
};

export default AddEditTestCase;
