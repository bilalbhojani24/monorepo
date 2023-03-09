import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { matchRoutes, useLocation } from 'react-router-dom';
import { getStorage, initLogger } from '@browserstack/utils';
import { PROJECT_NORMALISED_NAME_IDENTIFIER } from 'constants/common';
import { AMPLITUDE_KEY, ANALYTICS_KEY, EDS_API_KEY } from 'constants/keys';
import { ROUTES } from 'constants/routes';
import { APP_ROUTES } from 'constants/routesConstants';
import { getProjectsList } from 'globalSlice';
import useAuthRoutes from 'hooks/useAuthRoutes';

const ROUTES_ARRAY = Object.values(ROUTES).map((route) => ({ path: route }));

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [{ params }] = matchRoutes(ROUTES_ARRAY, location);
  useMemo(() => {
    const keys = {
      amplitudeKey: AMPLITUDE_KEY,
      analyticsKey: ANALYTICS_KEY,
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
  return useAuthRoutes(
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
    'https://www.browserstack.com/users/sign_in'
  );
};

export default App;
