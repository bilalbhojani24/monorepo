import React from 'react';
import { TMButton, TMPageHeadings } from 'common/bifrostProxy';

import useAddEditTestCase from './useAddEditTestCase';

const TopSection = () => {
  const { showTestCaseAdditionPage, isAddTestCasePageVisible } =
    useAddEditTestCase();

  return (
    <div className="w-full">
      <TMPageHeadings
        heading="Test Cases"
        actions={
          <>
            {!isAddTestCasePageVisible && (
              <TMButton
                variant="primary"
                colors="white"
                onClick={showTestCaseAdditionPage}
              >
                Create Test Case
              </TMButton>
            )}
          </>
        }
      />
    </div>
  );
};

export default TopSection;
