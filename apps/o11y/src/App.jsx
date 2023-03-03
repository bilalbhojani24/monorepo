import { useDispatch } from 'react-redux';
import { matchRoutes, useLocation } from 'react-router-dom';
import { getStorage } from '@browserstack/utils';
import { PROJECT_NORMALISED_NAME_IDENTIFIER } from 'constants/common';
import { getProjectsList } from 'globalSlice';
import useAuthRoutes from 'hooks/useAuthRoutes';

import { ROUTES } from './constants/routes';
import { APP_ROUTES } from './constants/routesConstants';

import './App.scss';

const ROUTES_ARRAY = Object.values(ROUTES).map((route) => ({ path: route }));

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [{ params }] = matchRoutes(ROUTES_ARRAY, location);
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
