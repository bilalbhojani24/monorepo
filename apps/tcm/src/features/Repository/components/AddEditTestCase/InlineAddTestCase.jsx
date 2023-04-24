import React, { forwardRef, useState } from 'react';
import classNames from 'classnames';
import { TMInputWButton } from 'common/bifrostProxy';
import PropTypes from 'prop-types';
import { onSubmitKeyHandler } from 'utils/helperFunctions';

import useAddEditTestCase from './useAddEditTestCase';

const InlineAddTestCase = forwardRef(({ noBorder }, ref) => {
  const [testCase, setTestCase] = useState('');

  const { saveTestCase, folderId } = useAddEditTestCase();

  const handleInlineInputButtonClick = () => {
    saveTestCase({ name: testCase, test_case_folder_id: folderId }, true);
    setTestCase('');
  };

  return (
    <div
      className={classNames('relative w-full p-2 ', {
        'border-base-200 border-t': !noBorder
      })}
    >
      <TMInputWButton
        value={testCase}
        onKeyDown={(e) => onSubmitKeyHandler(e, handleInlineInputButtonClick)}
        id="inline-add-test-case"
        buttonElement="Add"
        ref={ref}
        placeholder="Add new test case"
        onChange={(e) => setTestCase(e.target.value)}
        onButtonClick={handleInlineInputButtonClick}
      />
    </div>
  );
});
InlineAddTestCase.propTypes = {
  noBorder: PropTypes.bool
};

InlineAddTestCase.defaultProps = {
  noBorder: false
};

export default InlineAddTestCase;
