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
  const [tabName, setTabName] = useState('Overview');

  useEffect(() => {
    navigate(`/grid-console/grid/${paramId}/${tabName.toLowerCase()}`);
  }, [paramId, tabName]);

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
    let tabToOpen = 'Overview';
    const isOverviewPath = matchPath(
      { path: ROUTES.GRID_OVERVIEW },
      location.pathname
    );

    const isUtilizationPath = matchPath(
      { path: ROUTES.GRID_UTILIZATION },
      location.pathname
    );

    if (isOverviewPath !== null) {
      tabToOpen = 'Overview';
    } else if (isUtilizationPath !== null) {
      tabToOpen = 'Utilization';
    } else {
      tabToOpen = 'Settings';
    }

    setTabName(tabToOpen);

    if (tabToOpen === 'Settings') navigate(location.pathname);
    else navigate(`/grid-console/grid/${paramId}/${tabToOpen.toLowerCase()}`);
  });

  return { setTabName, tabName };
};

export default useLayoutGridDetail;
