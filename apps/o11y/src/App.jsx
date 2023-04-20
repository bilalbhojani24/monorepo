import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  matchPath,
  matchRoutes,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { initLogger } from '@browserstack/utils';
import { getPusherConfig } from 'api/global';
import ModalToShow from 'common/ModalToShow';
import { o11yHistory } from 'constants/common';
import { AMPLITUDE_KEY, ANALYTICS_KEY, EDS_API_KEY } from 'constants/keys';
import { ROUTES } from 'constants/routes';
import { APP_ROUTES } from 'constants/routesConstants';
import { initO11yProduct } from 'globalSlice';
import { getActiveProject, getUserDetails } from 'globalSlice/selectors';
import useAuthRoutes from 'hooks/useAuthRoutes';
import isEmpty from 'lodash/isEmpty';
import { getEnvConfig } from 'utils/common';
import { delightedInit } from 'utils/delighted';
import { subscribeO11yPusher } from 'utils/pusherEventHandler';

const ROUTES_ARRAY = Object.values(ROUTES).map((route) => ({ path: route }));
const PUSHER_CONNECTION_NAME = 'o11y-pusher';

const App = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector(getUserDetails);
  const activeProject = useSelector(getActiveProject);
  const location = useLocation();
  const [{ params }] = matchRoutes(ROUTES_ARRAY, location);
  const isProjectListing = matchPath(
    {
      path: ROUTES.projects
    },
    location.pathname
  );

  // init custom history object to allow navigation from
  // anywhere in the react app (inside or outside components)
  o11yHistory.navigate = useNavigate();
  o11yHistory.location = location;

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

  useEffect(() => {
    // Note: Disabling for onboarding, Get access and project selection pages
    if (activeProject.id && !isProjectListing) {
      // Initialize delighted survey
      const delightedConfig = {
        group_id: userDetails.groupId,
        screen_height: window.innerHeight,
        screen_width: window.innerWidth,
        url: o11yHistory.location.pathname,
        user_id: userDetails.userId
      };
      delightedInit(delightedConfig);
      // End delighted survey
    }
  }, [activeProject, isProjectListing, userDetails]);

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
