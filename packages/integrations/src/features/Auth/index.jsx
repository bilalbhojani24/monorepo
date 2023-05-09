import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { getSetupStatus } from '../../api/getSetupStatus';
import {
  clearGlobalAlert,
  setGlobalAlert
} from '../../common/slices/globalAlertSlice';
import {
  ANALYTICS_EVENTS,
  analyticsEvent,
  getCommonMetrics
} from '../../utils/analytics';
import { setHasIntegrated } from '../slices/integrationsSlice';

import APIToken from './APIToken';
import { SYNC_POLL_MAX_ATTEMPTS } from './constants';
import OAuth from './OAuth';
import { APITokenMetaType, OAuthMetaType } from './types';

const IntegrationAuth = ({
  integrationKey,
  label,
  oAuthMeta,
  apiTokenMeta
  // eslint-disable-next-line sonarjs/cognitive-complexity
}) => {
  const dispatch = useDispatch();
  const [hasOAuthFailed, setHasOAuthFailed] = useState(false);
  const [isOAuthActive, setIsOAuthActive] = useState(true);
  const [isSyncInProgress, setIsSyncInProgress] = useState(false);

  const showOAuth = () => {
    setIsOAuthActive(true);
  };
  const showAPIToken = () => {
    setIsOAuthActive(false);
  };
  const hideFailedAuthMessage = () => {};
  const pollTimers = useRef([]);

  const clearTimersAfter = (start) => {
    for (let idx = start; idx < pollTimers.current.length; idx += 1) {
      if (pollTimers.current[idx]) {
        clearTimeout(pollTimers.current[idx]);
      }
    }
    // clear timers queue
    pollTimers.current = [];
  };
  const pollerFn = (attempt = 1, setLoadingState, authMethod) => {
    if (attempt <= SYNC_POLL_MAX_ATTEMPTS) {
      getSetupStatus(integrationKey).then((response) => {
        const metricsPayload = {
          ...getCommonMetrics(),
          auth_method: authMethod
        };
        if (response?.data?.success && response?.data?.setup_completed) {
          analyticsEvent(ANALYTICS_EVENTS.AUTH_SUCCESS, metricsPayload);
          clearTimersAfter(attempt);
          dispatch(setHasIntegrated({ integrationKey, setupCompleted: true }));
          dispatch(clearGlobalAlert());
          setIsSyncInProgress(false);
          if (setLoadingState) setLoadingState(false);
        } else if (attempt === pollTimers.current.length) {
          // clear timers queue
          pollTimers.current = [];
          analyticsEvent(ANALYTICS_EVENTS.AUTH_ERROR, metricsPayload);
          setHasOAuthFailed(true);
          dispatch(
            setGlobalAlert({
              kind: 'error',
              message: `There was some problem connecting to ${label} software.`,
              autoDismiss: true
            })
          );
          setIsSyncInProgress(false);
          if (setLoadingState) setLoadingState(false);
        }
      });
    }
  };

  const syncPoller = (setLoadingState, pollCount, authMethod) => {
    // polling is in progress
    if (pollTimers.current.length) return;
    setIsSyncInProgress(true);

    const pollLimit = pollCount || SYNC_POLL_MAX_ATTEMPTS;
    for (
      let oAuthPollCounter = 0;
      oAuthPollCounter < pollLimit;
      oAuthPollCounter += 1
    ) {
      // 1, 3, 6, 10, 15 ... nth term  = n(n + 1) / 2
      const n = oAuthPollCounter + 1;
      const delayConstant = (n * (n + 1)) / 2;
      const timer = setTimeout(() => {
        pollerFn(n, setLoadingState, authMethod);
      }, delayConstant * 1000);
      pollTimers.current.push(timer);
    }
  };

  return isOAuthActive ? (
    <OAuth
      label={label}
      oAuthMeta={oAuthMeta}
      syncPoller={syncPoller}
      showAPIToken={showAPIToken}
      integrationKey={integrationKey}
      hasOAuthFailed={hasOAuthFailed}
      isSyncInProgress={isSyncInProgress}
      setHasOAuthFailed={setHasOAuthFailed}
      hideFailedAuthMessage={hideFailedAuthMessage}
    />
  ) : (
    <APIToken
      label={label}
      showOAuth={showOAuth}
      syncPoller={syncPoller}
      apiTokenMeta={apiTokenMeta}
      integrationKey={integrationKey}
      isSyncInProgress={isSyncInProgress}
    />
  );
};

IntegrationAuth.propTypes = {
  integrationKey: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  oAuthMeta: PropTypes.shape(OAuthMetaType),
  apiTokenMeta: PropTypes.shape(APITokenMetaType)
};

IntegrationAuth.defaultProps = {
  oAuthMeta: {},
  apiTokenMeta: {}
};

export default IntegrationAuth;
