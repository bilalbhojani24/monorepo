import React, { useState } from 'react';
import { PageHeadings, Tabs } from '@browserstack/bifrost';
import { string } from 'prop-types';

import ActiveProjects from './ActiveProjects';
import ClosedProjects from './ClosedProjects';

const AllProjects = (props) => {
  const { defaultTab } = props;
  const ACTIVE_PROJECTS = 'Active Projects';

  const [currentTab, setCurrentTab] = useState(defaultTab);

  const handleTabChange = (tabName) => {
    setCurrentTab(tabName.name);
  };

  const addProject = () => {
    // open modal to add a new project
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
              actionFn: addProject,
              variant: 'white',
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
      {currentTab === ACTIVE_PROJECTS ? <ActiveProjects /> : <ClosedProjects />}
    </div>
  );
};

AllProjects.propTypes = {
  defaultTab: string,
};

AllProjects.defaultProps = {
  defaultTab: 'Active Projects',
};

export default AllProjects;
