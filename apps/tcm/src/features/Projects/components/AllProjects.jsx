import React, { useState } from 'react';
import { TMPageHeadings, TMTabs } from '_proxyComp';
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
    <div className="flex flex-1 flex-col items-stretch">
      <div className="border-b  border-base-300">
        <TMPageHeadings
          heading="All Projects"
          actionsData={[
            {
              id: 'node-1',
              actionsNode: <>Add projects</>,
              actionFn: addingProject,
              variant: 'primary',
            },
          ]}
        />
      </div>
      <div className="flex flex-1 flex-col items-stretch bg-base-100">
        <div className="p-5">
          <TMTabs
            id="project-tabs"
            tabsArray={[
              { name: 'Active Projects' },
              { name: 'Closed Projects' },
            ]}
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
