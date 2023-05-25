import React from 'react';
import { Button, PageHeadings, Tabs } from '@browserstack/bifrost';

import ClustersListing from './ClustersListing';
import GridDetail from './GridDetail';
import GridsListing from './GridsListing';
import useGridConsole from './useGridConsole';

const GridConsole = () => {
  const { currentListingType, setCurrentListingType } = useGridConsole();

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
              name: 'Grids',
              value: 'grids'
            },
            {
              name: 'Clusters',
              value: 'clusters'
            }
          ]}
          onTabChange={(e) => setCurrentListingType(e.value)}
        />
      </div>

      {currentListingType === 'grids' && <GridsListing />}
      {currentListingType === 'clusters' && <ClustersListing />}
      <GridDetail />
    </div>
  );
};

export default GridConsole;
