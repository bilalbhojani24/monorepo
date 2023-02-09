import React, { useState } from 'react';
import { InputWButton } from '@browserstack/bifrost';
import { onSubmitKeyHandler } from 'utils/helperFunctions';

import useAddEditTestCase from './useAddEditTestCase';

const InlineAddTestCase = () => {
  const [testCase, setTestCase] = useState('');

  const { saveTestCase } = useAddEditTestCase();

  const handleInlineInputButtonClick = () => {
    saveTestCase({ name: testCase });
    setTestCase('');
  };

  return (
    <div className="relative w-full p-2">
      <InputWButton
        value={testCase}
        onKeyDown={(e) => onSubmitKeyHandler(e, handleInlineInputButtonClick)}
        id="inline-add-test-case"
        buttonElement="Create Test Case"
        placeholder="Add new test case"
        onChange={(e) => setTestCase(e.target.value)}
        onButtonClick={handleInlineInputButtonClick}
      />
    </div>
  );
};

export default InlineAddTestCase;
