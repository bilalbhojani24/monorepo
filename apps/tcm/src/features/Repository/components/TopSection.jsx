import React from 'react';
import { TMPageHeadings } from 'common/bifrostProxy';

import useTestCases from './useTestCases';

const TopSection = () => {
  const { showTestCaseAdditionPage } = useTestCases();

  return (
    <div className="w-full">
      <TMPageHeadings
        heading="Test Cases"
        actions={[
          {
            id: 'node-1',
            callback: showTestCaseAdditionPage,
            actionProps: {
              children: <>Create Test Case</>,
              variant: 'primary',
              colors: 'white',
            },
          },
        ]}
      />
    </div>
  );
};

export default TopSection;
