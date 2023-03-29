import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  CheckCircleIcon,
  MdArrowForward,
  MdSwapHoriz
} from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import { getOAuthUrlForTool } from '../../../api/getOAuthUrlForTool';
import { getSetupStatus } from '../../../api/getSetupStatus';
import { Loader, Logo } from '../../../common/components';
import { setGlobalAlert } from '../../../common/slices/globalAlertSlice';
import { setHasIntegrated } from '../../slices/integrationsSlice';
import { OAuthMetaType } from '../types';

const OAuth = ({
  integrationKey,
  label,
  oAuthMeta: { logo_url: logo, title, feature_list: features, description },
  showAPIToken,
  hasOAuthFailed,
  setHasOAuthFailed
}) => {
  const [isOAuthConnecting, setIsOAuthConnecting] = useState(false);
  const dispatch = useDispatch();
  const [authWindow, setAuthWindow] = useState({});
  const OAUTH_POLL_MAX = 5;
  const pollTimers = useRef(new Array(OAUTH_POLL_MAX));
  const authWindowName = 'browser_oauth';
  const clearTimersAfter = (start) => {
    for (let idx = start; idx < pollTimers.length; idx += 1) {
      if (pollTimers[idx]) {
        clearTimeout(pollTimers[idx]);
      }
    }
  };

  const pollerFn = (attempt = 1) => {
    if (attempt <= OAUTH_POLL_MAX) {
      getSetupStatus(integrationKey).then((response) => {
        if (response?.data?.success && response?.data?.setup_completed) {
          clearTimersAfter(attempt);
          dispatch(setHasIntegrated(integrationKey));
        } else {
          setHasOAuthFailed(true);
          dispatch(
            setGlobalAlert({
              kind: 'error',
              message: 'There was some problem connecting to JIRA software'
            })
          );
        }
      });
    }
  };

  const oAuthSyncPoller = () => {
    for (
      let oAuthPollCounter = 0;
      oAuthPollCounter < OAUTH_POLL_MAX;
      oAuthPollCounter += 1
    ) {
      // 1, 3, 6, 10, 15 ... nth term  = n(n + 1) / 2
      const n = oAuthPollCounter + 1;
      const delayConstant = (n * (n + 1)) / 2;
      const timer = setTimeout(() => {
        pollerFn(n);
      }, delayConstant * 1000);
      pollTimers[oAuthPollCounter] = timer;
    }
  };
  useEffect(() => {
    const handleMessage = (event) => {
      setIsOAuthConnecting(true);
      let message = {};
      try {
        message = JSON.parse(event.data);
      } catch (e) {
        return e;
      } finally {
        setIsOAuthConnecting(false);
      }
      // oauth has failed
      if (message.hasError) {
        setHasOAuthFailed(true);
        dispatch(
          setGlobalAlert({
            kind: 'error',
            message: 'There was some problem connecting to JIRA software'
          })
        );
      } else {
        oAuthSyncPoller();
      }
      authWindow?.close();
    };
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [setHasOAuthFailed, dispatch, integrationKey, authWindow]);

  const handleAPIConnect = () => {
    showAPIToken();
  };

  const handleOAuthConnection = () => {
    getOAuthUrlForTool(integrationKey).then((redirectUri) => {
      const childWindow = window.open(
        redirectUri,
        authWindowName,
        'height=640,width=960'
      );
      setAuthWindow(childWindow);

      let timer = null;

      function checkChild() {
        if (childWindow.closed) {
          pollerFn(OAUTH_POLL_MAX);
          clearInterval(timer);
        }
      }
      timer = setInterval(checkChild, 500);
    });
  };

  if (isOAuthConnecting) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader />;
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="flex items-center justify-center ">
          <Logo logo="/icons/browserstack.png" label="Browserstack" />
          <MdSwapHoriz className="text-brand-500 mx-3 text-3xl" />
          <Logo logo={logo} label={label} />
        </div>
        <div className="border-base-200 border-b py-6 text-center">
          <p className="text-base-900 text-xl">{title}</p>
          <p className="text-base-500 text-sm">{description}</p>
        </div>
        <div>
          <p className="my-6">
            <ul>
              {features?.map((feature) => (
                <li className="text-base-700 flex py-2.5 text-sm">
                  <CheckCircleIcon className="text-success-500 mr-2.5 w-6" />
                  {feature}
                </li>
              ))}
            </ul>
          </p>
        </div>
      </div>
      <div className="sticky bottom-0 bg-white pb-2">
        <Button
          variant="primary"
          wrapperClassName="mt-3"
          fullWidth
          icon={<MdArrowForward className="text-xl text-white" />}
          iconPlacement="end"
          onClick={handleOAuthConnection}
        >
          {`Connect to ${label}`}
        </Button>
        {hasOAuthFailed && (
          <Button
            wrapperClassName="mt-3"
            variant="secondary"
            fullWidth
            onClick={handleAPIConnect}
          >
            Connect using API Token
          </Button>
        )}
      </div>
    </>
  );
};

OAuth.propTypes = {
  integrationKey: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  oAuthMeta: PropTypes.shape(OAuthMetaType),
  hasOAuthFailed: PropTypes.bool,
  shouldShowFailedAuthMessage: PropTypes.bool,
  showAPIToken: PropTypes.func.isRequired,
  setHasOAuthFailed: PropTypes.func.isRequired
};

OAuth.defaultProps = {
  oAuthMeta: {},
  hasOAuthFailed: false,
  shouldShowFailedAuthMessage: false
};

export default OAuth;
