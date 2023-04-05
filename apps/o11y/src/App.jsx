import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { matchRoutes, useLocation } from 'react-router-dom';
import { getStorage, initLogger } from '@browserstack/utils';
import { getPusherConfig } from 'api/global';
import ModalToShow from 'common/ModalToShow';
import { PROJECT_NORMALISED_NAME_IDENTIFIER } from 'constants/common';
import { AMPLITUDE_KEY, ANALYTICS_KEY, EDS_API_KEY } from 'constants/keys';
import { ROUTES } from 'constants/routes';
import { APP_ROUTES } from 'constants/routesConstants';
import { getProjectsList } from 'globalSlice';
import useAuthRoutes from 'hooks/useAuthRoutes';
import { getEnvConfig } from 'utils/common';
import { subscribeO11yPusher } from 'utils/pusherEventHandler';

const ROUTES_ARRAY = Object.values(ROUTES).map((route) => ({ path: route }));
const PUSHER_CONNECTION_NAME = 'o11y-pusher';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [{ params }] = matchRoutes(ROUTES_ARRAY, location);
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

  const fetchAndInitPusher = useCallback(async () => {
    try {
      const res = await getPusherConfig();
      const channelData = {
        channel: res.data?.channel,
        token: res.data?.token,
        type: res.data?.type,
        groupId: res.data?.group_id,
        connectionName: PUSHER_CONNECTION_NAME
      };
      dispatch(subscribeO11yPusher(channelData, res.data?.pusher_url));
    } catch (error) {
      // fail silently
    }
  }, [dispatch]);

  useEffect(() => {
    fetchAndInitPusher();
  }, [fetchAndInitPusher]);

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
