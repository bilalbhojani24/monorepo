import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { matchRoutes, useLocation } from 'react-router-dom';
import { initLogger } from '@browserstack/utils';
import ModalToShow from 'common/ModalToShow';
import { AMPLITUDE_KEY, ANALYTICS_KEY, EDS_API_KEY } from 'constants/keys';
import { ROUTES } from 'constants/routes';
import { APP_ROUTES } from 'constants/routesConstants';
import { initO11yProduct } from 'globalSlice';
import { getUserDetails } from 'globalSlice/selectors';
import useAuthRoutes from 'hooks/useAuthRoutes';
import isEmpty from 'lodash/isEmpty';
import { getEnvConfig } from 'utils/common';

const ROUTES_ARRAY = Object.values(ROUTES).map((route) => ({ path: route }));

const App = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector(getUserDetails);
  const location = useLocation();
  const [{ params }] = matchRoutes(ROUTES_ARRAY, location);
  useMemo(() => {
    if (!isEmpty(userDetails)) {
      const keys = {
        amplitudeKey: AMPLITUDE_KEY,
        analyticsKey: ANALYTICS_KEY,
        amplitudeConfig: {
          key: AMPLITUDE_KEY,
          userData: {
            user_id: userDetails.userId
          },
          groupData: {
            group_id: userDetails.groupId
          }
        },
        EDSDetails: {
          userDetails: {
            user_id: userDetails.userId,
            group_id: userDetails.groupId
          },
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
    }
  }, [userDetails]);

  const initO11y = async () => dispatch(initO11yProduct(params));

  const Routes = useAuthRoutes(APP_ROUTES, initO11y, getEnvConfig().signInUrl);
  return (
    <>
      {Routes}
      <ModalToShow />
    </>
  );
};

export default App;
