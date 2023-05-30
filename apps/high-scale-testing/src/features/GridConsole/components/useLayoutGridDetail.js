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
import ROUTES from 'constants/routes';
import { getUserDetails } from 'globalSlice/selector';

import { setGridData } from '../slices';

const useLayoutGridDetail = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const paramId = params.id; // grid id

  const userDetails = useSelector(getUserDetails);

  // All State variables
  const [currentTab, setCurrentTab] = useState({
    index: 0,
    name: 'Overview'
  });

  useEffect(() => {
    navigate(`/grid-console/grid/${paramId}/${currentTab.name.toLowerCase()}`);
  }, [paramId, currentTab]);

  useEffect(() => {
    const fetchGridDataByIdFromAPI = async (gridId) => {
      const res = await fetchGridDataById(gridId, userDetails.id);
      dispatch(
        setGridData({
          gridData: res.data
        })
      );
    };

    if (paramId) fetchGridDataByIdFromAPI(paramId);
  }, [dispatch, paramId, userDetails]);

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

  return { setCurrentTab, currentTab };
};

export default useLayoutGridDetail;
