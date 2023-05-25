import React, { useState } from 'react';
import { PageHeadings, Tabs } from '@browserstack/bifrost';

import GridOverview from './GridOverview';

const GridDetail = () => {
  const [data, setData] = useState('Overview');

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
      onTabChange={(e) => setData(e.name)}
    />
  );

  return (
    <>
      <div className="bg-white px-6 pt-6">
        <PageHeadings
          breadcrumbs={[
            { name: 'Grids', url: '/grid-console', current: false },
            {
              name: data,
              url: '',
              current: true
            }
          ]}
          heading="high-scale-grid"
        />

        {TabsForGridDetail}
      </div>

      <GridOverview />
    </>
  );
};

export default GridDetail;
