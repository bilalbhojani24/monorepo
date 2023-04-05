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
  TMAttachments,
  TMButton,
  TMComboBox,
  TMFileUpload,
  TMInputField,
  TMRichTextEditor,
  TMSectionHeadings,
  TMSelectMenu,
  // TMTooltip,
  // TMTooltipBody,
  // TMTooltipHeader,
  TMTruncateText
} from 'common/bifrostProxy';

import {
  priorityOptions,
  statusOptions,
  templateOptions,
  testCaseTypesOptions
} from '../const/addTestCaseConst';

import StepComponent from './StepComponent';
import UnsavedChanges from './UnsavedChanges';
import useAddEditTestCase from './useAddEditTestCase';
import useTestCases from './useTestCases';

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
    usersArrayMapped,
    tagsArray,
    issuesArray,
    showAddTagsModal,
    hideAddTagsModal,
    fileUploaderHelper,
    fileRemoveHandler,
    // tagVerifierFunction,
    showAddIssueModal,
    hideAddIssueModal,
    addIssuesSaveHelper,
    testCaseEditingInit,
    handleMenuOpen
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
                testCaseFormData.template &&
                templateOptions.find(
                  (item) => item.value === testCaseFormData.template
                )
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
        {testCaseFormData.template === templateOptions[0].value ? (
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
                  label="Priority"
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
                  multiple={false}
                  wrapperClassName="w-64 h-36"
                  heading=""
                  linkText="Upload a file"
                  subHeading="PNG, JPG, PDF, CSV, MP4 up to 50 MB"
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
