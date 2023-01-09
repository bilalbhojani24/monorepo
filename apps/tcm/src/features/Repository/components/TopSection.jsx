import React from 'react';
import { PageHeadings } from '@browserstack/bifrost';

import useTestCases from './useTestCases';

const TopSection = () => {
  const { showTestCaseAdditionPage } = useTestCases();

  return (
    <div className="w-full">
      <PageHeadings
        heading="Repository"
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
