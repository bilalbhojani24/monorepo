import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  matchPath,
  matchRoutes,
  useLocation,
  useNavigate
} from 'react-router-dom';
import {
  initErrorLogger,
  initLogger,
  setErrorLoggerUserContext
} from '@browserstack/utils';
import { getPusherConfig } from 'api/global';
import { o11yHistory } from 'constants/common';
import {
  AMPLITUDE_KEY,
  ANALYTICS_KEY,
  EDS_API_KEY,
  SENTRY_DSN
} from 'constants/keys';
import { ROUTES } from 'constants/routes';
import { initO11yProduct } from 'globalSlice/index';
import { getActiveProject, getUserDetails } from 'globalSlice/selectors';
import isEmpty from 'lodash/isEmpty';
import { getEnvConfig } from 'utils/common';
import { delightedInit } from 'utils/delighted';
import { subscribeO11yPusher } from 'utils/pusherEventHandler';
import { isIntegrationsPage } from 'utils/routeUtils';
import { showBannerPerPriority } from 'utils/showBannerPerPriority';

const envConfig = getEnvConfig();
const PUSHER_CONNECTION_NAME = 'o11y-pusher';
const ROUTES_ARRAY = Object.values(ROUTES).map((route) => ({ path: route }));

function useInitO11y() {
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
            apiKey: EDS_API_KEY
          }
        }
      };

      if (!window.initialized) {
        initLogger(keys);
        dispatch(showBannerPerPriority());
        window.initialized = true;
      }
    }
  }, [dispatch, userDetails]);

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
    if (!envConfig.isMocker) {
      fetchAndInitPusher();
    }
  }, [fetchAndInitPusher]);

  // init sentry
  useEffect(() => {
    const { enableSentry } = envConfig;
    if (enableSentry && !window.isSentryInitialized) {
      window.isSentryInitialized = true;
      initErrorLogger({
        dsn: SENTRY_DSN,
        debug: false,
        release: 'v0.1-o11y',
        environment: 'production',
        tracesSampleRate: 1.0,
        denyUrls: [
          // Ignoring errors getting generated from Chrome extensions as these are not to be logged under our sentry env.
          /extensions\//i,
          /^chrome:\/\//i,
          /extension:\//i,
          // Ignoring VWO related errors as there is no specific library upgrade which can resolve the errors.
          // Also the errors we are getting are more or less specfic to some of the users.
          /https:\/\/dev.visualwebsiteoptimizer.com\/.*/gi,
          // Ignore errors getting raised from freshchat widget related code.
          /https:\/\/wchat.freshchat.com\/.*/gi
        ]
      });
    }
    if (userDetails.userId && window.isSentryInitialized) {
      setErrorLoggerUserContext(userDetails.userId);
    }
  }, [userDetails.userId]);

  const initO11y = async () =>
    dispatch(
      initO11yProduct({ params, setFirstProjectActive: isIntegrationsPage() })
    );

  return {
    initO11y
  };
}

export default useInitO11y;
