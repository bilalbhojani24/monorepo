import React, { useState } from 'react';
import { TMPageHeadings, TMTabs } from 'bifrostProxy';
import { string } from 'prop-types';

import ActiveTestRuns from './ActiveTestRuns';
import AddTestRun from './AddTestRun';
import ClosedTestRuns from './ClosedTestRuns';
import useTestRuns from './useTestRuns';

const TestRuns = (props) => {
  const { defaultTab } = props;
  const [currentTab, setCurrentTab] = useState(defaultTab);
  const ACTIVE_PROJECTS = 'Active Test Runs';

  const { activeTestRuns, addingTestRun, addTestRun } = useTestRuns();

  const handleTabChange = (tabName) => {
    setCurrentTab(tabName.name);
  };

  return (
    <div className="flex flex-1 flex-col items-stretch">
      <div className="border-base-300  border-b">
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
      <div className="bg-base-100 flex flex-1 flex-col items-stretch">
        <div className="p-5">
          <TMTabs
            id="project-tabs"
            tabsArray={[
              { name: 'Active Test Runs' },
              { name: 'Closed Test Runs' },
            ]}
            onTabChange={handleTabChange}
          />
        </div>
        <div>
          {currentTab === ACTIVE_PROJECTS ? (
            <ActiveTestRuns rowsData={activeTestRuns} />
          ) : (
            <ClosedTestRuns />
          )}
          {addTestRun ? <AddTestRun /> : ''}
        </div>
      </div>
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
