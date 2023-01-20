import React, { useEffect } from 'react';
import { TMButton, TMPageHeadings } from 'common/bifrostProxy';

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
      <div className="border-base-300 border-b">
        <TMPageHeadings
          heading="Test Runs"
          actions={
            <>
              <TMButton variant="primary" onClick={showTestRunAddFormHandler}>
                Create Test Run
              </TMButton>
            </>
          }
        />
      </div>

      <div className="flex flex-1 flex-col items-stretch p-4">
        <TestRunsTable />
      </div>
    </div>
  );
};

TestRuns.propTypes = {};

TestRuns.defaultProps = {};

export default TestRuns;
