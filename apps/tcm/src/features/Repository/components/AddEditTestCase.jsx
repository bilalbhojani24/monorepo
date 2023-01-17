import React from 'react';
import {
  TMInputField,
  TMSectionHeadings,
  TMSelectMenu,
  TMTextArea,
  TMTooltip,
} from 'bifrostProxy';

import {
  ownerOptions,
  priorityOptions,
  stateOptions,
  templateOptions,
  testCaseTypesOptions,
} from '../const/addTestCaseConst';

import useTestCases from './useTestCases';

const AddEditTestCase = () => {
  const {
    handleTestCaseFieldChange,
    inputError,
    testCaseFormData,
    selectedFolder,
    hideTestCaseAdditionPage,
    saveTestCase,
    editTestCase,
    isTestCaseEditing,
  } = useTestCases();

  return (
    <div className="border-base-200 w-full border-l p-4">
      <TMSectionHeadings
        title={`${selectedFolder?.name} / ${testCaseFormData?.name}`}
        variant="buttons"
        secondaryButtonProps={{
          children: 'Save',
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
      {/* <div className="w-1/3">
        <TMSelectMenu
          defaultValue={templateOptions[0]}
          checkPosition="right"
          label="Choose Template*"
          options={templateOptions}
          onChange={(e) => handleTestCaseFieldChange('type', e.value)}
        />
      </div> */}
      <div className="mt-4">
        <TMSelectMenu
          defaultValue={testCaseTypesOptions[0]}
          checkPosition="right"
          label="Test Case Type"
          options={testCaseTypesOptions}
          onChange={(e) => handleTestCaseFieldChange('type', e.value)}
          value={
            testCaseFormData.type &&
            testCaseTypesOptions.find(
              (item) => item.value === testCaseFormData.type,
            )
          }
        />
      </div>
      <div className="mt-4">
        <TMSelectMenu
          defaultValue={priorityOptions[0]}
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
      <div className="mt-4">
        <TMSelectMenu
          // value={
          //   testCaseFormData.state &&
          //   stateOptions.find((item) => item.value === testCaseFormData.state)
          // }
          defaultValue={stateOptions[0]}
          checkPosition="right"
          label="State"
          options={stateOptions}
          onChange={(e) => handleTestCaseFieldChange('state', e.value)}
        />
      </div>
      <div className="mt-4">
        <TMSelectMenu
          defaultValue={ownerOptions[0]}
          checkPosition="right"
          label="Owner"
          options={ownerOptions}
          onChange={(e) => handleTestCaseFieldChange('owner', e.value)}
        />
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
      <div className="mt-4">
        <TMInputField
          id="test-case-estimate"
          value={testCaseFormData.estimate}
          label={
            <>
              Estimate{' '}
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
    </div>
  );
};

export default AddEditTestCase;
