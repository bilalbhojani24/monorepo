import React from 'react';
import { Outlet } from 'react-router-dom';
import { PageHeadings, Tabs } from '@browserstack/bifrost';

import ROUTES from '../../../constants/routes';

import useLayoutClusterDetail from './useLayoutClusterDetail';

const LayoutClusterDetail = () => {
  const { setCurrentTab, currentTab } = useLayoutClusterDetail();

  const TabsForClusterDetail = (
    <Tabs
      tabsArray={[
        {
          index: 0,
          name: 'Overview'
        },
        {
          index: 1,
          name: 'Utilization'
        }
      ]}
      onTabChange={(e) => setCurrentTab(e)}
      defaultIndex={currentTab.index}
    />
  );

  return (
    <div className="flex-1">
      <div className="bg-white px-6 pt-6">
        <PageHeadings
          breadcrumbs={[
            { name: 'Clusters', url: ROUTES.GRID_CONSOLE, current: false },
            {
              name: currentTab.name,
              url: '',
              current: true
            }
          ]}
          heading="high-scale-grid"
        />

        {TabsForClusterDetail}
      </div>

      <Outlet />
    </div>
  );
};

export default LayoutClusterDetail;