import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMountEffect } from '@browserstack/hooks';
import { logEvent } from '@browserstack/utils';
import { fetchAllClustersData } from 'api/index';
import { AGAutomationConsoleInteracted } from 'constants/event-names';
import ROUTES from 'constants/routes';
import { getClusterData } from 'features/ClusterDetail/slices/selector';
import { getUserDetails } from 'globalSlice/selector';

import { setClusterData } from '../slices';

const useGridConsole = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const options = [
    {
      id: 'helm/kubectl',
      value: 'Helm/KubeCTL',
      body: 'Spawn a grid via Helm / KubeCTL'
    },
    { id: 'cli', value: 'CLI', body: 'Spawn a grid with customizations' }
  ];

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

  const dropdownHandler = (value) => {
    navigate(`${ROUTES.CREATE_GRID}?type=${value.value}`);
  };

  const tabChangeHandler = (e) => {
    if (e.value === 'grids') {
      logEvent(['amplitude'], 'web_events', AGAutomationConsoleInteracted, {
        action: 'grids_clicked'
      });
    } else if (e.value === 'clusters') {
      logEvent(['amplitude'], 'web_events', AGAutomationConsoleInteracted, {
        action: 'clusters_clicked'
      });
    }
    setCurrentListingType(e);
  };

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
    dropdownHandler,
    navigate,
    options,
    tabChangeHandler,
    tabsArray
  };
};

export default useGridConsole;
