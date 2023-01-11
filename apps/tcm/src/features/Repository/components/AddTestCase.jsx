import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  TMInputField,
  TMNotifications,
  TMSectionHeadings,
  TMSelectMenu,
} from '_proxyComp';

import useTestCases from './useTestCases';

const AddTestCase = () => {
  const { projectId } = useParams();
  const {
    selectedFolder,
    hideTestCaseAdditionPage,
    saveTestCase,
    showNotification,
  } = useTestCases();
  const [testCaseName, setTestCaseName] = useState('');
  const testCaseNameInHeader = testCaseName ? ` / ${testCaseName}` : '';

  const handleChange = (e) => {
    setTestCaseName(e.target.value);
  };

  return (
    <div className="w-full border-l border-base-200 p-4 pt-4">
      <TMSectionHeadings
        title={`${selectedFolder?.name}${testCaseNameInHeader}`}
        variant="buttons"
        secondaryButtonProps={{
          children: 'Save',
          variant: 'primary',
          onClick: saveTestCase(projectId, selectedFolder?.id, {
            name: testCaseName,
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
          id="test-case-name"
          label="Name of Test Case*"
          onChange={handleChange}
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
        />
      </div>
      <TMNotifications
        title="Test Case has been created"
        description={`'${testCaseNameInHeader}' has been successfully created`}
        show={showNotification}
      />
    </div>
  );
};

export default AddTestCase;
