import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { InputWButton } from '@browserstack/bifrost';

import useTestCases from './useTestCases';

const InlineAddTestCase = () => {
  const [testCase, setTestCase] = useState('');

  const { saveTestCase } = useTestCases();

  const handleInlineInputButtonClick = () => {
    saveTestCase({ name: testCase });
    setTestCase('');
  };

  return (
    <div className="shadow-slate-200 relative w-full p-2">
      <InputWButton
        value={testCase}
        id="inline-add-test-case"
        buttonElement="Add Test Case"
        placeholder="Add new test case"
        onChange={(e) => setTestCase(e.target.value)}
        onButtonClick={handleInlineInputButtonClick}
      />
    </div>
  );
};

export default InlineAddTestCase;
