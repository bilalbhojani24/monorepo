import React, { useEffect } from 'react';
import { TMPageHeadings } from 'bifrostProxy';

import AddTestRun from './AddTestRun';
import TestRunsTable from './TestRunsTable';
import useTestRuns from './useTestRuns';

const TestRuns = () => {
  const {
    showTestRunAddFormHandler,
    showAddTestRunsForm,
    fetchAllTestRuns,
    projectId,
  } = useTestRuns();

  useEffect(() => {
    fetchAllTestRuns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  if (showAddTestRunsForm) return <AddTestRun />;

  return (
    <div className="flex flex-1 flex-col items-stretch">
      <div className="border-b  border-base-300">
        <TMPageHeadings
          heading="Test Runs"
          actionsData={[
            {
              id: 'node-1',
              actionsNode: <>Add Test Run</>,
              actionFn: showTestRunAddFormHandler,
              variant: 'primary',
            },
          ]}
        />
      </div>

      <div className="flex flex-1 flex-col items-stretch bg-base-100 p-5">
        <TestRunsTable />
      </div>
    </div>
  );
};

TestRuns.propTypes = {};

TestRuns.defaultProps = {};

export default TestRuns;
