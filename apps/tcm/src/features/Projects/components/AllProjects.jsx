import React, { useState } from 'react';
import { PageHeadings, Tabs } from '@browserstack/bifrost';

import ActiveProjects from './ActiveProjects';

const ACTIVE_PROJECTS = 'Active Projects';

const AllProjects = (props) => {
  const { defaultTab } = props;

  const [currentTab, setCurrentTab] = useState(defaultTab);

  const handleTabChange = (tabName) => {
    // console.log(tabName.name);
    setCurrentTab(tabName.name);
  };

  return (
    <div>
      <div className="border-b-2 border-base-300">
        <PageHeadings
          heading="All Projects"
          actionsData={[
            {
              id: 'node-1',
              actionsNode: <>Add projects</>,
              actionFn: () => {
                console.log('Action button fn 1');
              },
              variant: 'primary',
            },
          ]}
        />
      </div>
      <div className="bg-base-100 px-4 py-2">
        <Tabs
          id="project-tabs"
          tabsArray={[{ name: 'Active Projects' }, { name: 'Closed Projects' }]}
          onTabChange={handleTabChange}
        />
      </div>
      {currentTab === ACTIVE_PROJECTS ? (
        <ActiveProjects />
      ) : (
        <>Closed Projects</>
      )}
    </div>
  );
};

export default AllProjects;
