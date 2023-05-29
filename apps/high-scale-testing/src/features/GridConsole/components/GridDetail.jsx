import React, { useState } from 'react';
import { PageHeadings, Tabs } from '@browserstack/bifrost';

import ROUTES from '../../../constants/routes';

import GridOverview from './GridOverview';

const GridDetail = () => {
  const [tabName, setTabName] = useState('Overview');

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

      <GridOverview />
    </div>
  );
};

export default GridDetail;
