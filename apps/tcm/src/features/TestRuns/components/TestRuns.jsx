import React from 'react';
import { TMPageHeadings, TMTabs } from 'bifrostProxy';
import { string } from 'prop-types';

import AddTestRun from './AddTestRun';
import TestRunsTable from './TestRunsTable';
import useTestRuns from './useTestRuns';

const TestRuns = () => {
  const { addingTestRun, showAddModal } = useTestRuns();

  return (
    <div className="flex flex-1 flex-col items-stretch">
      <div className="border-b  border-base-300">
        <TMPageHeadings
          heading="Test Runs"
          actionsData={[
            {
              id: 'node-1',
              actionsNode: <>Add Test Run</>,
              actionFn: addingTestRun,
              variant: 'primary',
            },
          ]}
        />
      </div>
      <div className="flex flex-1 flex-col items-stretch bg-base-100 p-5">
        <TestRunsTable />
      </div>
      {showAddModal ? <AddTestRun /> : ''}
    </div>
  );
};

TestRuns.propTypes = {
  defaultTab: string,
};

TestRuns.defaultProps = {
  defaultTab: 'Active Test Runs',
};

export default TestRuns;
