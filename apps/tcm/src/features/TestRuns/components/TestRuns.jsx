import React, { useEffect, useState } from 'react';
import { TMButton, TMPageHeadings, TMTabs } from 'common/bifrostProxy';

import { TABS_ARRAY } from '../const/immutableConst';

import AddEditTestRun from './AddEditTestRun';
import TestRunsTable from './TestRunsTable';
import useTestRuns from './useTestRuns';

const TestRuns = () => {
  const {
    projectId,
    showTestRunAddFormHandler,
    isAddTestRunsFormVisible,
    fetchAllTestRuns,
    handleTabChange
  } = useTestRuns();

  useEffect(() => {
    fetchAllTestRuns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  if (isAddTestRunsFormVisible) return <AddEditTestRun />;

  return (
    <div className="flex flex-1 flex-col items-stretch">
      <div className="border-base-300 border-b">
        <TMPageHeadings
          wrapperClassName="px-4 pt-6 bg-transparent"
          heading="Test Runs"
          actions={
            <>
              <TMButton variant="primary" onClick={showTestRunAddFormHandler}>
                Create Test Run
              </TMButton>
            </>
          }
        />
        <div className="mb-0 w-full px-4">
          <TMTabs
            id="project-tabs"
            tabsArray={TABS_ARRAY}
            onTabChange={handleTabChange}
          />
        </div>
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
