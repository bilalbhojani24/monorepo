import React, { useState } from 'react';
import { PageHeadings, Tabs } from '@browserstack/bifrost';
import { string } from 'prop-types';

import ActiveProjects from './ActiveProjects';
import AddProjects from './AddProjects';
import ClosedProjects from './ClosedProjects';
import useProjects from './useProjects';

const AllProjects = (props) => {
  const { defaultTab } = props;
  const [currentTab, setCurrentTab] = useState(defaultTab);
  const ACTIVE_PROJECTS = 'Active Projects';

  const { activeProjects, addingProject, showAddModal } = useProjects();

  const handleTabChange = (tabName) => {
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
              actionFn: addingProject,
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
      {currentTab === ACTIVE_PROJECTS ? (
        <ActiveProjects rowsData={activeProjects} />
      ) : (
        <ClosedProjects />
      )}
      {showAddModal ? <AddProjects /> : ''}
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
