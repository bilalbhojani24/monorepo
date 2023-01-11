import React from 'react';
import { useParams } from 'react-router-dom';
import { TMInputField, TMSectionHeadings, TMSelectMenu } from 'bifrostProxy';

import useTestCases from './useTestCases';

const AddTestCase = () => {
  const { projectId } = useParams();
  const {
    handleTestCaseFieldChange,
    // inputError,
    selectedFolder,
    hideTestCaseAdditionPage,
    saveTestCase,
    testCaseFormPayload,
  } = useTestCases();

  const handleTemplateChange = () => {
    // console.log('from template', e);
  };

  console.log('test case form payload', testCaseFormPayload);
  return (
    <div className="w-full border-l border-base-200 p-4 pt-4">
      <TMSectionHeadings
        title={`${selectedFolder?.name} / ${testCaseFormPayload?.name}`}
        variant="buttons"
        secondaryButtonProps={{
          children: 'Save',
          variant: 'primary',
          onClick: saveTestCase(projectId, selectedFolder?.id, {
            name: testCaseFormPayload,
          }),
        }}
        primaryButtonProps={{
          children: 'Cancel',
          variant: 'white',
          onClick: hideTestCaseAdditionPage,
        }}
      />
      <div className="my-4">
        <TMInputField
          // value={testCaseFormPayload?.name}
          id="test-case-name"
          label="Name of Test Case*"
          onChange={handleTestCaseFieldChange('name')}
          // errorText={inputError ? "This field can't be left empty" : ''}
        />
      </div>
      <div className="w-1/3">
        <TMSelectMenu
          defaultValue={{ label: 'Text', value: 'text' }}
          checkPosition="right"
          label="Choose Template*"
          options={[
            { label: 'Text', value: 'text' },
            { label: 'Steps', value: 'steps' },
          ]}
          onChange={handleTemplateChange}
        />
      </div>
      <div className="mt-4">
        <TMInputField
          // value={testCaseFormPayload?.type}
          id="test-case-type"
          label="Test Case Type"
          onChange={handleTestCaseFieldChange('type')}
        />
      </div>
      <div className="mt-4">
        <TMInputField
          // value={testCaseFormPayload?.priority}
          id="test-case-priority"
          label="Priority"
          onChange={handleTestCaseFieldChange('priority')}
        />
      </div>
      <div className="mt-4">
        <TMInputField
          // value={testCaseFormPayload?.description}
          id="test-case-description"
          label="Description"
          onChange={handleTestCaseFieldChange('description')}
        />
      </div>
      <div className="mt-4">
        <TMInputField
          // value={testCaseFormPayload?.state}
          id="test-case-state"
          label="State"
          onChange={handleTestCaseFieldChange('state')}
        />
      </div>
      <div className="mt-4">
        <TMInputField
          // value={testCaseFormPayload?.owner}
          id="test-case-owner"
          label="Owner"
          onChange={handleTestCaseFieldChange('owner')}
        />
      </div>
      <div className="mt-4">
        <TMInputField
          // value={testCaseFormPayload?.precondition}
          id="test-case-precondition"
          label="Preconditions"
          onChange={handleTestCaseFieldChange('precondition')}
        />
      </div>
      <div className="mt-4">
        <TMInputField
          // value={testCaseFormPayload?.estimate}
          id="test-case-estimate"
          label="Estimate"
          onChange={handleTestCaseFieldChange('estimate')}
        />
      </div>
    </div>
  );
};

export default AddTestCase;
