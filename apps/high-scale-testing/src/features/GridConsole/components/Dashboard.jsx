import React, { useEffect } from 'react';
import { Button, PageHeadings, Tabs } from '@browserstack/bifrost';

import ClustersListing from './ClustersListing';
import CreateGridCLIModal from './CreateGridCLIModal';
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
      <div className="bg-white px-6 pt-6">
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
              index: 0,
              name: 'Grids',
              value: 'grids'
            },
            {
              index: 1,
              name: 'Clusters',
              value: 'clusters'
            }
          ]}
          onTabChange={(e) => setCurrentListingType(e)}
          defaultIndex={currentListingType.index}
        />
      </div>

      {currentListingType.value === 'grids' && <GridsListing />}
      {currentListingType.value === 'clusters' && <ClustersListing />}
      {showCreateGridCLIModal && <CreateGridCLIModal />}
    </div>
  );
};

export default GridConsole;
