import React from 'react';

import useClustersListing from './useClustersListing';

const ClustersListing = () => {
  console.log('Log: This is Cluster Listing');

  const { clustersList } = useClustersListing();
  return (
    clustersList.length > 0 && <div>This is Cluster Listing component</div>
  );
};

export default ClustersListing;
