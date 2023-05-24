import React from 'react';
import { Button, PageHeadings, Tabs } from '@browserstack/bifrost';

import CreateGridCLIModal from '../CreateGridCLIModal';

import ClustersListing from './ClustersListing';
import GridsListing from './GridsListing';
import useGridConsole from './useGridConsole';

const GridConsole = () => {
  const {
    createGridBtnHandler,
    currentListingType,
    setCurrentListingType,
    showCreateGridCLIModal
  } = useGridConsole();

  return (
    <div className="flex-1">
      <div className="bg-white px-6 pt-9">
        <PageHeadings
          actions={
            <Button onClick={createGridBtnHandler}> Create Grid </Button>
          }
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
      {showCreateGridCLIModal && <CreateGridCLIModal />}
    </div>
  );
};

export default GridConsole;
