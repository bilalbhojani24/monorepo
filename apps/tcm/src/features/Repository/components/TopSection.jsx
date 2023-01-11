import React from 'react';
import { TMPageHeadings } from 'bifrostProxy';

import useTestCases from './useTestCases';

const TopSection = () => {
  const { showTestCaseAdditionPage } = useTestCases();

  return (
    <div className="w-full">
      <TMPageHeadings
        heading="Test Cases"
        actionsData={[
          {
            id: 'node-1',
            actionsNode: <>Add Test Case</>,
            actionFn: showTestCaseAdditionPage,
            variant: 'primary',
          },
        ]}
      />
    </div>
  );
};

export default TopSection;
