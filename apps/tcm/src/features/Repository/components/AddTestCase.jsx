import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  InputField,
  Notifications,
  SectionHeadings,
  SelectMenu,
} from '@browserstack/bifrost';

import useTestCases from './useTestCases';

const AddTestCase = () => {
  const { projectId } = useParams();
  const {
    selectedFolder,
    hideTestCaseAdditionPage,
    isAddTestCasePageVisible,
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
      <SectionHeadings
        title={`${selectedFolder?.name}${testCaseNameInHeader}`}
        variant="buttons"
        secondaryButtonProps={{
          children: 'Save',
          onClick: saveTestCase(projectId, selectedFolder.id, {
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
        <InputField
          id="test-case-name"
          label="Name of Test Case*"
          onChange={handleChange}
        />
      </div>
      <div className="w-1/3">
        <SelectMenu
          defaultValue={{ label: 'Text', value: 'text' }}
          checkPosition="right"
          label="Choose Template*"
          options={[
            { label: 'Text', value: 'text' },
            { label: 'Steps', value: 'steps' },
          ]}
        />
      </div>
      <Notifications
        title="Test Case has been created"
        description={`'${testCaseNameInHeader}' has been successfully created`}
        show={showNotification}
      />
    </div>
  );
};

export default AddTestCase;
