import { useState } from 'react';

const useClustersListing = () => {
  const [clustersList, setClustersList] = useState([]);

  return { clustersList };
};

export default useClustersListing;
