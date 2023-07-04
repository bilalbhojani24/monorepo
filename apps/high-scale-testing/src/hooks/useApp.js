import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  initErrorLogger,
  initLogger,
  setErrorLoggerUserContext
} from '@browserstack/utils';
import { INIT_URL } from 'api/constants/apiURLs';
import axios from 'axios';
import {
  AMPLITUDE_KEY,
  ANALYTICS_KEY,
  EDS_API_KEY,
  SENTRY_DSN
} from 'constants/keys';
import ROUTES from 'constants/routes';
import { initialiseApplication } from 'globalSlice';
import {
  getIsApploading,
  getShowSetup,
  getTrialGrid,
  getUserDetails
} from 'globalSlice/selector';
import { getEnv, getEnvConfig } from 'utils/common';

const useApp = () => {
  const dispatch = useDispatch();
  const env = getEnv();
  const envConfig = getEnvConfig();
  const navigate = useNavigate();

  const { enableAnalytics, enableSentry } = envConfig;

  const isAppLoading = useSelector(getIsApploading);
  const { isUsed: isTrialGridUsed } = useSelector(getTrialGrid);
  const showSetup = useSelector(getShowSetup);
  const userDetails = useSelector(getUserDetails);

  const initAPI = async () => {
    const response = await axios.get(INIT_URL);

    dispatch(initialiseApplication(response.data));

    return response;
  };

  useEffect(() => {
    if (enableSentry) {
      initErrorLogger({
        dsn: SENTRY_DSN,
        debug: false,
        release: 'v1.0.0-hst',
        environment: env,
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

    if (!isAppLoading && enableAnalytics) {
      const analyticsConfig = {
        amplitudeKey: AMPLITUDE_KEY,
        amplitudeConfig: {
          key: AMPLITUDE_KEY,
          userData: {
            user_id: userDetails.id
          },
          groupData: {
            group_id: userDetails.groupId
          }
        },
        analyticsKey: ANALYTICS_KEY,
        EDSDetails: {
          userDetails: {
            user_id: userDetails.id,
            group_id: userDetails.groupId
          },
          config: {
            server: 'eds.browserstack.com',
            port: '443',
            apiKey: EDS_API_KEY
          }
        }
      };

      initLogger(analyticsConfig);
    }

    if (userDetails.id && enableSentry) {
      setErrorLoggerUserContext(userDetails.id);
    }
  }, [enableAnalytics, enableSentry, env, isAppLoading, userDetails]);

  useEffect(() => {
    if (
      !isAppLoading &&
      Object.keys(userDetails).length > 0 &&
      showSetup &&
      !isTrialGridUsed
    ) {
      navigate(ROUTES.SETUP);
    }
  }, [isAppLoading, isTrialGridUsed, navigate, showSetup, userDetails]);

  return {
    initAPI
  };
};

export default useApp;
