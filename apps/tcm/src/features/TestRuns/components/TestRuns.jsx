import React, { useEffect, useState } from 'react';
import { TMButton, TMPageHeadings, TMTabs } from 'common/bifrostProxy';

import { TABS_ARRAY } from '../const/immutableConst';

import AddEditTestRun from './AddEditTestRun';
import TestRunsTable from './TestRunsTable';
import useTestRuns from './useTestRuns';

const TestRuns = () => {
  const {
    showTestRunAddFormHandler,
    isAddTestRunsFormVisible,
    handleTabChange
  } = useTestRuns();

  if (isAddTestRunsFormVisible) return <AddEditTestRun />;

  return (
    <div className="flex flex-1 shrink-0 grow flex-col overflow-hidden">
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

      <div className="flex flex-1 shrink-0  grow flex-col overflow-y-auto p-4">
        <div className="border-base-200 flex flex-col  justify-start  rounded-md border bg-white">
          <TestRunsTable />
        </div>
      </div>
    </div>
  );
};

TestRuns.propTypes = {};

TestRuns.defaultProps = {};

export default TestRuns;
