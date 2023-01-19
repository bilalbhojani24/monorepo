import React, { useEffect } from 'react';
import { TMPageHeadings } from 'common/bifrostProxy';

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
          actions={[
            {
              id: 'node-1',
              callback: showTestRunAddFormHandler,
              actionProps: {
                children: <>Create TestRun</>,
                variant: 'primary',
              },
            },
          ]}
        />
      </div>

      <div className="bg-base-100 flex flex-1 flex-col items-stretch p-5">
        <TestRunsTable />
      </div>
    </div>
  );
};

TestRuns.propTypes = {};

TestRuns.defaultProps = {};

export default TestRuns;
