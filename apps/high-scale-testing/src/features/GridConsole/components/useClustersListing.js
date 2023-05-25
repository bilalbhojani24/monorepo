import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchAllClustersData } from 'api/index';
import { getUserDetails } from 'globalSlice/selector';

const useClustersListing = () => {
  // All Store variables:
  const userDetails = useSelector(getUserDetails);

  const [clustersList, setClustersList] = useState([]);

  useEffect(() => {
    const fetchAllClustersDataFromAPI = async () => {
      const res = await fetchAllClustersData(userDetails.id);
      setClustersList(res.data);
    };

    fetchAllClustersDataFromAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    clustersList
  };
};

export { useClustersListing };
