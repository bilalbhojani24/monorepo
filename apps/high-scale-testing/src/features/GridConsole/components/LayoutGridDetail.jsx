import React from 'react';
import { Outlet } from 'react-router-dom';
import { PageHeadings, Tabs } from '@browserstack/bifrost';

import ROUTES from '../../../constants/routes';

import useLayoutGridDetail from './useLayoutGridDetail';

const LayoutGridDetail = () => {
  const { setTabName, tabName } = useLayoutGridDetail();

  const TabsForGridDetail = (
    <Tabs
      tabsArray={[
        {
          name: 'Overview'
        },
        {
          name: 'Utilization'
        },
        {
          name: 'Settings'
        }
      ]}
      onTabChange={(e) => setTabName(e.name)}
    />
  );

  return (
    <div className="flex-1">
      <div className="bg-white px-6 pt-6">
        <PageHeadings
          breadcrumbs={[
            { name: 'Grids', url: ROUTES.GRID_CONSOLE, current: false },
            {
              name: tabName,
              url: '',
              current: true
            }
          ]}
          heading="high-scale-grid"
        />

        {TabsForGridDetail}
      </div>

      <Outlet />
    </div>
  );
};

export default LayoutGridDetail;
