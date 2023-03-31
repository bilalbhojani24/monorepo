import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { getSetupStatus } from '../../api/getSetupStatus';
import {
  clearGlobalAlert,
  setGlobalAlert
} from '../../common/slices/globalAlertSlice';
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
}) => {
  const dispatch = useDispatch();
  const [hasOAuthFailed, setHasOAuthFailed] = useState(false);
  const [isOAuthActive, setIsOAuthActive] = useState(true);
  const showOAuth = () => {
    setIsOAuthActive(true);
  };
  const showAPIToken = () => {
    setIsOAuthActive(false);
  };
  const hideFailedAuthMessage = () => {};
  const pollTimers = useRef([]);
  const clearTimersAfter = (start) => {
    for (let idx = start; idx < pollTimers.length; idx += 1) {
      if (pollTimers[idx]) {
        clearTimeout(pollTimers[idx]);
      }
    }
  };
  const pollerFn = (attempt = 1) => {
    if (attempt <= SYNC_POLL_MAX_ATTEMPTS) {
      getSetupStatus(integrationKey).then((response) => {
        if (response?.data?.success && response?.data?.setup_completed) {
          clearTimersAfter(attempt);
          dispatch(setHasIntegrated(integrationKey));
          dispatch(clearGlobalAlert());
        } else {
          setHasOAuthFailed(true);
          dispatch(
            setGlobalAlert({
              kind: 'error',
              message: `There was some problem connecting to ${label} software`
            })
          );
        }
      });
    }
  };

  const syncPoller = () => {
    for (
      let oAuthPollCounter = 0;
      oAuthPollCounter < SYNC_POLL_MAX_ATTEMPTS;
      oAuthPollCounter += 1
    ) {
      // 1, 3, 6, 10, 15 ... nth term  = n(n + 1) / 2
      const n = oAuthPollCounter + 1;
      const delayConstant = (n * (n + 1)) / 2;
      const timer = setTimeout(() => {
        pollerFn(n);
      }, delayConstant * 1000);
      pollTimers.current.push(timer);
    }
  };

  return isOAuthActive ? (
    <OAuth
      label={label}
      pollerFn={pollerFn}
      oAuthMeta={oAuthMeta}
      syncPoller={syncPoller}
      showAPIToken={showAPIToken}
      integrationKey={integrationKey}
      hasOAuthFailed={hasOAuthFailed}
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
