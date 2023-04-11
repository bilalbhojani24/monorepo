import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { matchRoutes, useLocation, useNavigate } from 'react-router-dom';
import { getStorage, initLogger } from '@browserstack/utils';
import ModalToShow from 'common/ModalToShow';
import {
  o11yHistory,
  PROJECT_NORMALISED_NAME_IDENTIFIER
} from 'constants/common';
import { AMPLITUDE_KEY, ANALYTICS_KEY, EDS_API_KEY } from 'constants/keys';
import { ROUTES } from 'constants/routes';
import { APP_ROUTES } from 'constants/routesConstants';
import { getProjectsList } from 'globalSlice';
import useAuthRoutes from 'hooks/useAuthRoutes';
import { getEnvConfig } from 'utils/common';

const ROUTES_ARRAY = Object.values(ROUTES).map((route) => ({ path: route }));

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [{ params }] = matchRoutes(ROUTES_ARRAY, location);

  // init custom history object to allow navigation from
  // anywhere in the react app (inside or outside components)
  o11yHistory.navigate = useNavigate();
  o11yHistory.location = location;

  useMemo(() => {
    const keys = {
      analyticsKey: ANALYTICS_KEY,
      amplitudeConfig: {
        key: AMPLITUDE_KEY,
        userData: {},
        groupData: {}
      },
      EDSDetails: {
        userDetails: '12',
        config: {
          server: 'eds.browserstack.com',
          port: '443',
          api: EDS_API_KEY
        }
      }
    };
    if (!window.initialized) {
      initLogger(keys);
      window.initialized = true;
    }
  }, []);
  const Routes = useAuthRoutes(
    APP_ROUTES,
    () =>
      dispatch(
        getProjectsList({
          projectNormalisedName: encodeURI(
            params?.projectNormalisedName ||
              getStorage(PROJECT_NORMALISED_NAME_IDENTIFIER)
          )
        })
      ),
    getEnvConfig().signInUrl
  );
  return (
    <>
      {Routes}
      <ModalToShow />
    </>
  );
};

export default App;
