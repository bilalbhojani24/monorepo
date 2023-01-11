import React from 'react';
import { useParams } from 'react-router-dom';
import { TMInputField, TMSectionHeadings, TMSelectMenu } from 'bifrostProxy';

import { priorityOptions, templateOptions } from '../const/addTestCaseConst';

import useTestCases from './useTestCases';

const AddTestCase = () => {
  const { projectId } = useParams();
  const {
    handleTestCaseFieldChange,
    newTestCaseData,
    selectedFolder,
    hideTestCaseAdditionPage,
    saveTestCase,
  } = useTestCases();

  return (
    <div className="w-full border-l border-base-200 p-4 pt-4">
      <TMSectionHeadings
        title={`${selectedFolder?.name} / ${newTestCaseData?.name}`}
        variant="buttons"
        secondaryButtonProps={{
          children: 'Save',
          variant: 'primary',
          onClick: saveTestCase(newTestCaseData),
        }}
        primaryButtonProps={{
          children: 'Cancel',
          variant: 'white',
          onClick: hideTestCaseAdditionPage,
        }}
      />
      <div className="my-4">
        <TMInputField
          // value={newTestCaseData?.name}
          id="test-case-name"
          label="Name of Test Case*"
          onChange={(e) =>
            handleTestCaseFieldChange('name', e.currentTarget.value)
          }
          // errorText={inputError ? "This field can't be left empty" : ''}
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
        <TMInputField
          // value={newTestCaseData?.type}
          id="test-case-type"
          label="Test Case Type"
          onChange={(e) =>
            handleTestCaseFieldChange('type', e.currentTarget.value)
          }
        />
      </div>
      <div className="mt-4">
        <TMSelectMenu
          defaultValue={priorityOptions[0]}
          checkPosition="right"
          label="Priority*"
          options={priorityOptions}
          onChange={(e) => handleTestCaseFieldChange('priority', e.value)}
        />
      </div>
      <div className="mt-4">
        <TMInputField
          // value={newTestCaseData?.description}
          id="test-case-description"
          label="Description"
          onChange={(e) =>
            handleTestCaseFieldChange('description', e.currentTarget.value)
          }
        />
      </div>
      <div className="mt-4">
        <TMInputField
          // value={newTestCaseData?.state}
          id="test-case-state"
          label="State"
          onChange={(e) =>
            handleTestCaseFieldChange('state', e.currentTarget.value)
          }
        />
      </div>
      <div className="mt-4">
        <TMInputField
          // value={newTestCaseData?.owner}
          id="test-case-owner"
          label="Owner"
          onChange={(e) =>
            handleTestCaseFieldChange('owner', e.currentTarget.value)
          }
        />
      </div>
      <div className="mt-4">
        <TMInputField
          // value={newTestCaseData?.precondition}
          id="test-case-precondition"
          label="Preconditions"
          onChange={(e) =>
            handleTestCaseFieldChange('precondition', e.currentTarget.value)
          }
        />
      </div>
      <div className="mt-4">
        <TMInputField
          // value={newTestCaseData?.estimate}
          id="test-case-estimate"
          label="Estimate"
          onChange={(e) =>
            handleTestCaseFieldChange('estimate', e.currentTarget.value)
          }
        />
      </div>
    </div>
  );
};

export default AddTestCase;
