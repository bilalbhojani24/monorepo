import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { initErrorLogger } from '@browserstack/utils';
import { INIT_URL } from 'api/constants/apiURLs';
import axios from 'axios';
import { SENTRY_DSN } from 'constants/keys';
import ROUTES from 'constants/routes';
import { initialiseApplication } from 'globalSlice';
import { getIsApploading, getUserDetails } from 'globalSlice/selector';
import { getEnv, getEnvConfig } from 'utils/common';

const useApp = () => {
  const dispatch = useDispatch();
  const env = getEnv();
  const envConfig = getEnvConfig();
  const navigate = useNavigate();

  const { enableSentry } = envConfig;

  const isAppLoading = useSelector(getIsApploading);
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
  }, [enableSentry, env, userDetails]);

  useEffect(() => {
    if (
      !isAppLoading &&
      Object.keys(userDetails).length > 0 &&
      !userDetails.onboardingCompleted
    ) {
      navigate(ROUTES.ONBOARDING);
    }
  }, [isAppLoading, navigate, userDetails]);

  return {
    initAPI
  };
};

export default useApp;
