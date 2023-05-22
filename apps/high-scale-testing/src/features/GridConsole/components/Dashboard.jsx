import React from 'react';
import {
  Badge,
  Button,
  HomeIcon,
  PageHeadings,
  Tabs,
  UsersIcon
} from '@browserstack/bifrost';

import GridListing from './GridListing';

const Dashboard = () => {
  // ToDo: Remove the below Variavble
  const primaryNavs = [
    {
      id: 'dashboard',
      label: 'Automation Console',
      activeIcon: HomeIcon,
      inActiveIcon: HomeIcon,
      path: '/',
      badge: <Badge text="Active" />
    },
    {
      id: 'team',
      label: 'Builds Dashboard',
      activeIcon: UsersIcon,
      inActiveIcon: UsersIcon,
      path: '/team'
    }
  ];

  return (
    <div className="flex-1">
      <div className="bg-white px-6 pt-9">
        <PageHeadings
          actions={<Button> Create Grid </Button>}
          breadcrumbs={null}
          heading="Automation Console"
        />
        <Tabs
          tabsArray={[
            {
              name: 'Grids'
            },
            {
              name: 'Clusters'
            }
          ]}
        />
      </div>

      <GridListing />
      <div>This is Cluster Listing component</div>
    </div>
  );
};

export default Dashboard;
