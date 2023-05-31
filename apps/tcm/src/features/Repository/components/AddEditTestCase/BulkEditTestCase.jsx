import React, { useEffect } from 'react';
import { InfoOutlinedIcon } from 'assets/icons';
import AddIssuesModal from 'common/AddIssuesModal';
import {
  TMButton,
  TMModal,
  TMModalFooter,
  TMModalHeader,
  TMRichTextEditor,
  TMSectionHeadings,
  TMSelectMenu
} from 'common/bifrostProxy';

import UnsavedChanges from '../UnsavedChanges';
import useTestCases from '../useTestCases';

import useAddEditTestCase from './useAddEditTestCase';

const BulkEditTestCase = () => {
  const {
    bulkSelection,
    showBulkEditConfirmModal,
    isAddIssuesModalShown,
    bulkEditTestCaseCtaLoading,
    handleTestCaseFieldChange,
    testCaseBulkFormData,
    hideTestCaseAddEditPage,
    usersArrayMapped,
    issuesArray,
    projectId,
    priorityOptions,
    statusOptions,
    testCaseTypeOptions,
    automationOptions,
    showAddIssueModal,
    hideAddIssueModal,
    addIssuesSaveHelper,
    saveBulkEditHelper,
    setBulkEditConfirm,
    handleMenuOpen
  } = useAddEditTestCase();
  const { initFormValues } = useTestCases();

  useEffect(() => {
    initFormValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="border-base-200 w-full border-l p-4">
      <TMSectionHeadings
        title="Bulk Edit Test Cases"
        variant="buttons"
        trailingHeadNode={
          <div className="flex items-center justify-end">
            <TMButton
              colors="white"
              variant="primary"
              onClick={hideTestCaseAddEditPage}
            >
              Cancel
            </TMButton>
            <TMButton
              wrapperClassName="whitespace-nowrap ml-4"
              variant="primary"
              onClick={() => setBulkEditConfirm(true)}
              loading={bulkEditTestCaseCtaLoading}
              isIconOnlyButton={bulkEditTestCaseCtaLoading}
            >
              Update All
            </TMButton>
          </div>
        }
      />
      <p className="text-base-800 my-3 font-normal">
        Update the fields below which you want to update for all the selected
        test cases.
      </p>

      <>
        <div className="mt-4 flex">
          <div className="w-1/2 flex-1 pr-4">
            <TMSelectMenu
              checkPosition="right"
              label="Type of Test Case"
              options={testCaseTypeOptions}
              placeholder="Select from options"
              defaultValue={null}
              onChange={(e) => handleTestCaseFieldChange('case_type', e.value)}
              // value={
              //   testCaseBulkFormData?.case_type
              //     ? testCaseTypesOptions.find(
              //         (item) => item.value === testCaseBulkFormData?.case_type
              //       )
              //     : null
              // }
            />
          </div>
          <div className="w-1/2 flex-1">
            <TMSelectMenu
              checkPosition="right"
              label="Automation Status"
              placeholder="Select automation status"
              options={automationOptions}
              onChange={(e) =>
                handleTestCaseFieldChange('automation_status', e.value)
              }
              // value={
              //   testCaseFormData.automation_status &&
              //   automationOptions.find(
              //     (item) => item.value === testCaseFormData.automation_status
              //   )
              // }
            />
          </div>
        </div>
        <div className="mt-4 flex">
          <div className="w-1/2 flex-1 pr-4">
            <TMSelectMenu
              checkPosition="right"
              label="Priority"
              placeholder="Select from options"
              options={priorityOptions}
              // value={
              //   testCaseBulkFormData.priority &&
              //   priorityOptions.find(
              //     (item) => item.value === testCaseBulkFormData?.priority
              //   )
              // }
              onChange={(e) => handleTestCaseFieldChange('priority', e.value)}
            />
          </div>
          <div className="w-1/2 flex-1">
            <TMSelectMenu
              // value={
              //   testCaseBulkFormData.status &&
              //   statusOptions.find(
              //     (item) => item.value === testCaseBulkFormData?.status?.id
              //   )
              // }
              checkPosition="right"
              label="State"
              placeholder="Select from options"
              options={statusOptions}
              onChange={(e) => handleTestCaseFieldChange('status', e.value)}
            />
          </div>
        </div>
        <div className="mt-4 flex">
          {/* <div className="flex-1">
            <TMInputField
              id="test-case-estimate"
              value={testCaseBulkFormData.estimate}
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
                            You can define an estimate time you would require
                            for this test case. Below format types are
                            permitted:
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
          </div> */}
          <div className="w-1/2 flex-1 pr-4">
            <TMSelectMenu
              // value={
              //   testCaseBulkFormData.owner &&
              //   usersArrayMapped?.find(
              //     (item) => item.value === testCaseBulkFormData.owner
              //   )
              // }
              placeholder="Select owner"
              checkPosition="right"
              label="Owner"
              options={usersArrayMapped}
              onChange={(e) => handleTestCaseFieldChange('owner', e.value)}
            />
          </div>
          <div className="flex flex-1 items-end justify-between">
            <div className="mr-4 flex-1">
              <TMSelectMenu
                checkPosition="right"
                isMulti
                placeholder="Select from options"
                label="Issues"
                options={issuesArray}
                value={testCaseBulkFormData?.issues}
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
              Add New Issue
            </TMButton>
          </div>
        </div>

        <div className="mt-4">
          {/* <TMTextArea
            value={testCaseBulkFormData.preconditions}
            placeholder="Mention preconditions if any needed before executing this test"
            id="test-case-preconditions"
            label="Preconditions"
            onChange={(e) =>
              handleTestCaseFieldChange('preconditions', e.currentTarget.value)
            }
          /> */}
          <TMRichTextEditor
            label="Preconditions"
            id="test-case-preconditions"
            projectId={projectId}
            // value={testCaseBulkFormData.preconditions}
            height={160}
            placeholder="Mention preconditions if any needed before executing this test"
            onChange={(val) => handleTestCaseFieldChange('preconditions', val)}
          />
        </div>
      </>
      <TMModal
        show={showBulkEditConfirmModal}
        withDismissButton
        onOverlayClick={() => setBulkEditConfirm(false)}
      >
        <TMModalHeader
          heading="Bulk Edit"
          subHeading={
            <>
              <p>
                The selected test cases will be updated with the new set of data
                you entered.
              </p>
              <p>This action can&apos;t be undone.</p>
            </>
          }
          handleDismissClick={() => setBulkEditConfirm(false)}
          Icon={InfoOutlinedIcon}
        />
        <TMModalFooter position="right">
          <TMButton
            variant="primary"
            colors="white"
            onClick={() => setBulkEditConfirm(false)}
          >
            Cancel
          </TMButton>
          <TMButton
            variant="primary"
            colors="brand"
            wrapperClassName="ml-3"
            onClick={saveBulkEditHelper}
          >
            Update {bulkSelection?.ids.length} Cases
          </TMButton>
        </TMModalFooter>
      </TMModal>
      <AddIssuesModal
        isVisible={isAddIssuesModalShown}
        onClose={hideAddIssueModal}
        onSave={addIssuesSaveHelper}
      />
      <UnsavedChanges />
    </div>
  );
};

export default BulkEditTestCase;
