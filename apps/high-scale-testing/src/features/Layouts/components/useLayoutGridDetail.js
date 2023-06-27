import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  matchPath,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom';
import { useMountEffect } from '@browserstack/hooks';
import { fetchGridDataById } from 'api/index';
import {
  AGGridDetailsInteracted,
  AGGridSettingsVisited
} from 'constants/event-names';
import ROUTES from 'constants/routes';
import { setSelectedGridData } from 'features/GridConsole/slices';
import { setFetchedGridData } from 'globalSlice/index';
import { getFetchedGridData, getUserDetails } from 'globalSlice/selector';
import { logHSTEvent } from 'utils/logger';

import { getGridsData } from '../../GridConsole/slices/selector';

const useLayoutGridDetail = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const paramId = params.id; // grid id

  const fetchedGridData = useSelector(getFetchedGridData);
  const userDetails = useSelector(getUserDetails);

  // All Store variables
  const gridData = useSelector(getGridsData);

  // All State variables
  const [currentTab, setCurrentTab] = useState({
    index: 0,
    name: 'Overview'
  });

  const onTabChangeHandler = (e) => {
    logHSTEvent(['amplitude'], 'web_events', AGGridDetailsInteracted, {
      action: 'tab_switched',
      option: e.name.toLowerCase()
    });
    setCurrentTab(e);
  };

  useEffect(() => {
    if (currentTab.name === 'Settings') {
      logHSTEvent([], 'web_events', AGGridSettingsVisited, {
        action: 'general'
      });
      navigate(
        `/grid-console/grid/${paramId}/${currentTab.name.toLowerCase()}/general`
      );
    } else
      navigate(
        `/grid-console/grid/${paramId}/${currentTab.name.toLowerCase()}`
      );
  }, [paramId, currentTab]);

  useEffect(() => {
    const fetchGridDataByIdFromAPI = async (gridId) => {
      const res = await fetchGridDataById(gridId, userDetails.id);
      dispatch(setSelectedGridData(res.data));
      dispatch(setFetchedGridData(true));
    };

    if (paramId && !fetchedGridData) fetchGridDataByIdFromAPI(paramId);
  }, [dispatch, fetchedGridData, paramId, userDetails]);

  useMountEffect(() => {
    let tabToOpen = {
      index: 0,
      name: 'Overview'
    };
    const isOverviewPath = matchPath(
      { path: ROUTES.GRID_OVERVIEW },
      location.pathname
    );

    const isUtilizationPath = matchPath(
      { path: ROUTES.GRID_UTILIZATION },
      location.pathname
    );

    if (isOverviewPath !== null) {
      tabToOpen = {
        index: 0,
        name: 'Overview'
      };
    } else if (isUtilizationPath !== null) {
      tabToOpen = {
        index: 1,
        name: 'Utilization'
      };
    } else {
      tabToOpen = {
        index: 2,
        name: 'Settings'
      };
    }

    setCurrentTab(tabToOpen);

    if (tabToOpen.name === 'Settings') navigate(location.pathname);
    else
      navigate(`/grid-console/grid/${paramId}/${tabToOpen.name.toLowerCase()}`);
  });

  return { fetchedGridData, gridData, onTabChangeHandler, currentTab };
};

export default useLayoutGridDetail;
