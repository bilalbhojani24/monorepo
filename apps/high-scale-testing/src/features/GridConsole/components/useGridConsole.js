import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMountEffect } from '@browserstack/hooks';
import { fetchAllClustersData, fetchAllGridsData } from 'api/index';
import { AGAutomationConsoleInteracted } from 'constants/event-names';
import ROUTES from 'constants/routes';
import { setFetchedGridData } from 'globalSlice/index';
import {
  getFetchedGridData,
  getShowSetup,
  getTrialGrid,
  getUserDetails
} from 'globalSlice/selector';
import { logHSTEvent } from 'utils/logger';

import {
  setClusterData,
  setGridData,
  setShowCreateGridButton
} from '../slices';
import {
  getClustersData,
  getGridsData,
  getShowCreateGridButton
} from '../slices/selector';

const useGridConsole = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const options = [
    {
      id: 'helm',
      value: 'Helm',
      body: 'Spawn a grid via Helm'
    },
    { id: 'cli', value: 'CLI', body: 'Spawn a grid with customizations' }
  ];

  // All Store variables
  const clusterData = useSelector(getClustersData);
  const fetchedGridData = useSelector(getFetchedGridData);
  const gridData = useSelector(getGridsData);
  const showCreateGridButton = useSelector(getShowCreateGridButton);
  const showSetup = useSelector(getShowSetup);
  const { isUsed: isTrialGridUsed } = useSelector(getTrialGrid);
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
    let actionValue = '';
    if (value.value === 'CLI') {
      actionValue = 'gridcustomizations_selected';
    } else if (value.value === 'Helm') {
      actionValue = 'helmkubectl_selected';
    }

    logHSTEvent(['amplitude'], 'web_events', AGAutomationConsoleInteracted, {
      action: actionValue
    });

    navigate(`${ROUTES.CREATE_GRID}?type=${value.value}`);
  };

  const tabChangeHandler = (e) => {
    if (e.value === 'grids') {
      logHSTEvent(['amplitude'], 'web_events', AGAutomationConsoleInteracted, {
        action: 'grids_clicked',
        cluster_count: clusterData.length,
        fetched_grid_data: fetchedGridData,
        grid_count: gridData.length
      });
    } else if (e.value === 'clusters') {
      logHSTEvent(['amplitude'], 'web_events', AGAutomationConsoleInteracted, {
        action: 'clusters_clicked',
        cluster_count: clusterData.length,
        fetched_grid_data: fetchedGridData,
        grid_count: gridData.length
      });
    }
    setCurrentListingType(e);
  };

  useEffect(() => {
    const lengthOfClusterData = clusterData.length;
    const lengthOfGridData = gridData.length;

    if (lengthOfGridData > 1) {
      const hasTrialGrid =
        gridData.filter((grid) => grid.isTrialGrid).length > 0;

      dispatch(setShowCreateGridButton(!hasTrialGrid));

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
    } else if (showSetup && !isTrialGridUsed) {
      navigate(ROUTES.SETUP);
    }

    logHSTEvent([], 'web_events', 'AGAutomationConsoleVisited', {
      loading: false,
      grid_count: lengthOfGridData,
      cluster_count: lengthOfClusterData,
      tab_selected: 'Grid'
    });
  }, [
    clusterData,
    dispatch,
    gridData,
    isTrialGridUsed,
    navigate,
    showSetup,
    userDetails
  ]);

  useEffect(() => {
    const fetchAllClustersDataFromAPI = async () => {
      const res = await fetchAllClustersData(userDetails.id);
      dispatch(
        setClusterData({
          clusterData: res.data
        })
      );
    };

    const fetchAllGridsDataFromAPI = async () => {
      const res = await fetchAllGridsData(userDetails.id);

      dispatch(setGridData({ gridData: res.data }));
      dispatch(setFetchedGridData(true));
    };

    fetchAllGridsDataFromAPI();
    fetchAllClustersDataFromAPI();
  }, [dispatch, userDetails]);

  useMountEffect(() => {
    setCurrentListingType({
      index: 0,
      name: 'Grids',
      value: 'grids'
    });

    if (showSetup && !isTrialGridUsed) {
      navigate(ROUTES.SETUP);
    }

    logHSTEvent([], 'web_events', 'AGAutomationConsoleVisited', {
      loading: true
    });
  });

  return {
    currentListingType,
    dropdownHandler,
    gridData,
    navigate,
    options,
    showCreateGridButton,
    tabChangeHandler,
    tabsArray
  };
};

export default useGridConsole;
