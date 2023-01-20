import React from 'react';
import { TMButton, TMPageHeadings } from 'common/bifrostProxy';

import useTestCases from './useTestCases';

const TopSection = () => {
  const { showTestCaseAdditionPage } = useTestCases();

  return (
    <div className="w-full">
      <TMPageHeadings
        heading="Test Cases"
        actions={
          <>
            <TMButton
              variant="primary"
              colors="white"
              onClick={showTestCaseAdditionPage}
            >
              Create Test Case
            </TMButton>
          </>
        }
      />
    </div>
  );
};

export default TopSection;
