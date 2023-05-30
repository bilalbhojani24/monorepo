import { useEffect, useState } from 'react';
import {
  matchPath,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom';
import { useMountEffect } from '@browserstack/hooks';
import ROUTES from 'constants/routes';

const useLayoutGridDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const paramId = params.id; // grid id

  // All State variables
  const [tabName, setTabName] = useState('Overview');

  useEffect(() => {
    navigate(`/grid-console/grid/${paramId}/${tabName.toLowerCase()}`);
  }, [paramId, tabName]);

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
