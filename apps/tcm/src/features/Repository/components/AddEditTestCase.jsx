import React, { useEffect } from 'react';
import {
  TMButton,
  TMInputField,
  TMSectionHeadings,
  TMSelectMenu,
  TMTextArea,
  TMTooltip,
} from 'bifrostProxy';

import {
  priorityOptions,
  statusOptions,
  templateOptions,
  testCaseTypesOptions,
} from '../const/addTestCaseConst';

import StepComponent from './StepComponent';
import useAddEditTestCase from './useAddEditTestCase';

const AddEditTestCase = () => {
  const {
    handleTestCaseFieldChange,
    inputError,
    testCaseFormData,
    hideTestCaseAdditionPage,
    saveTestCase,
    editTestCase,
    isTestCaseEditing,
    showMoreFields,
    setShowMoreFields,
    fetchUsers,
    usersArray,
    tagsArray,
    issuesArray,
  } = useAddEditTestCase();

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="border-base-200 w-full border-l p-4">
      <TMSectionHeadings
        title={isTestCaseEditing ? 'Edit Test Case' : 'Create Test Case'}
        variant="buttons"
        secondaryButtonProps={{
          children: isTestCaseEditing ? 'Update' : 'Save',
          variant: 'primary',
          onClick: () => {
            if (isTestCaseEditing) editTestCase(testCaseFormData);
            else saveTestCase(testCaseFormData);
          },
        }}
        primaryButtonProps={{
          children: 'Cancel',
          variant: 'primary',
          colors: 'white',
          onClick: hideTestCaseAdditionPage,
        }}
      />
      <div className="my-4">
        <TMInputField
          id="test-case-name"
          label="Name of Test Case*"
          placeholder="Test Case 01"
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
              (item) => item.value === testCaseFormData.template,
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
                  e.currentTarget.value,
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
                    (item) => item.value === testCaseFormData.case_type,
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
                    (item) => item.value === testCaseFormData.priority,
                  )
                }
                onChange={(e) => handleTestCaseFieldChange('priority', e.value)}
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
                handleTestCaseFieldChange('description', e.currentTarget.value)
              }
            />
          </div>
          <div className="mt-4 flex gap-4">
            <div className="flex-1">
              <TMSelectMenu
                value={
                  testCaseFormData.status &&
                  statusOptions.find(
                    (item) => item.value === testCaseFormData.status,
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
                  usersArray.find(
                    (item) => item.value === testCaseFormData.owner,
                  )
                }
                checkPosition="right"
                label="Owner"
                options={usersArray}
                onChange={(e) => handleTestCaseFieldChange('owner', e.value)}
              />
            </div>
          </div>
          <div className="mt-4">
            <TMTextArea
              value={testCaseFormData.precondition}
              placeholder="Mention preconditions if any needed before executing this test"
              id="test-case-precondition"
              label="Preconditions"
              onChange={(e) =>
                handleTestCaseFieldChange('precondition', e.currentTarget.value)
              }
            />
          </div>
          <div className="mt-4 flex gap-4">
            <div className="flex-1">
              <TMInputField
                id="test-case-estimate"
                value={testCaseFormData.estimate}
                label={
                  <>
                    Estimate
                    <TMTooltip
                      description="test test"
                      placementSide="bottom"
                      theme="dark"
                    >
                      <span />
                    </TMTooltip>
                  </>
                }
                placeholder="Eg: 1m, 2.5h, 2d etc"
                onChange={(e) =>
                  handleTestCaseFieldChange('estimate', e.currentTarget.value)
                }
              />
            </div>
            <div className="flex flex-1 items-end justify-between">
              <div className="mr-4 flex-1">
                <TMSelectMenu
                  checkPosition="right"
                  isMultiSelect
                  label="Tags"
                  options={tagsArray}
                  // value={
                  //   testCaseFormData.tags &&
                  //   templateOptions.find(
                  //     (item) => item.value === testCaseFormData.tags,
                  //   )
                  // }
                  onChange={(e) => handleTestCaseFieldChange('tags', e.value)}
                />
              </div>
              <TMButton wrapperClassName="" colors="white">
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
                  label="Issues"
                  options={issuesArray}
                  // value={
                  //   testCaseFormData.tags &&
                  //   templateOptions.find(
                  //     (item) => item.value === testCaseFormData.tags,
                  //   )
                  // }
                  onChange={(e) => handleTestCaseFieldChange('issues', e.value)}
                />
              </div>
              <TMButton wrapperClassName="" colors="white">
                Add New Issue
              </TMButton>
            </div>
            <div className="flex-1" />
          </div>
          <div className="mt-4 flex gap-4">
            <div className="flex flex-col">
              <label className="text-base-700 mb-2 block text-sm font-medium">
                Attachments
              </label>
              <input type="file" name="attachment" id="attachment" />
            </div>
            <div className="flex-1" />
          </div>
        </>
      )}
    </div>
  );
};

export default AddEditTestCase;
