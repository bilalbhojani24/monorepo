import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMountEffect } from '@browserstack/hooks';
import { fetchAllClustersData } from 'api/index';
import { getClusterData } from 'features/ClusterDetail/slices/selector';
import { getUserDetails } from 'globalSlice/selector';

import { setClusterData } from '../slices';

const useGridConsole = () => {
  const dispatch = useDispatch();

  // All Store variables
  const clusterData = useSelector(getClusterData);
  const userDetails = useSelector(getUserDetails);

  // All State variables
  const [currentListingType, setCurrentListingType] = useState({
    index: 0,
    name: 'Grids',
    value: 'grids'
  });

  const [tabsArray, setTabsArray] = useState([
    {
      index: 0,
      name: 'Grids',
      value: 'grids'
    }
  ]);

  useEffect(() => {
    const lengthOfClusterData = clusterData.length;

    if (lengthOfClusterData > 1) {
      setTabsArray([
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
      ]);
    }
  }, [clusterData]);

  useEffect(() => {
    const fetchAllClustersDataFromAPI = async () => {
      const res = await fetchAllClustersData(userDetails.id);
      dispatch(
        setClusterData({
          clusterData: res.data
        })
      );
    };

    fetchAllClustersDataFromAPI();
  }, [dispatch, userDetails]);

  useMountEffect(() => {
    setCurrentListingType({
      index: 0,
      name: 'Grids',
      value: 'grids'
    });
  });

  return {
    currentListingType,
    setCurrentListingType,
    tabsArray
  };
};

export default useGridConsole;
