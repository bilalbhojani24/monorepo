import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchAllClustersData } from 'api/index';
import { getUserDetails } from 'globalSlice/selector';

const useClustersListing = () => {
  const isRounded = true;
  const statusModifier = {
    Creating: 'primary',
    Online: 'success',
    Deleting: 'error'
  };
  const tableCellWrapperClassName =
    'first:pr-3 last:pl-3 px-2 text-base-500 font-medium';

  // All Store variables:
  const userDetails = useSelector(getUserDetails);

  // All State variables:
  const [clustersList, setClustersList] = useState([]);

  useEffect(() => {
    const fetchAllClustersDataFromAPI = async () => {
      const res = await fetchAllClustersData(userDetails.id);
      setClustersList(res.data);
    };

    fetchAllClustersDataFromAPI();
  }, [userDetails]);

  return {
    clustersList,
    isRounded,
    statusModifier,
    tableCellWrapperClassName
  };
};

export { useClustersListing };