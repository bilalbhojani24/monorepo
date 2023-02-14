import React, { useState } from 'react';
import { InputWButton } from '@browserstack/bifrost';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { onSubmitKeyHandler } from 'utils/helperFunctions';

import useAddEditTestCase from './useAddEditTestCase';

const InlineAddTestCase = ({ noBorder }) => {
  const [testCase, setTestCase] = useState('');

  const { saveTestCase } = useAddEditTestCase();

  const handleInlineInputButtonClick = () => {
    saveTestCase({ name: testCase });
    setTestCase('');
  };

  return (
    <div
      className={classNames('relative w-full p-2 ', {
        'border-base-200 border-t': !noBorder
      })}
    >
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
InlineAddTestCase.propTypes = {
  noBorder: PropTypes.bool
};

InlineAddTestCase.defaultProps = {
  noBorder: false
};

export default InlineAddTestCase;
