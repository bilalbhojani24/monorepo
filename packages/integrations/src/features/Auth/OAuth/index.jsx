import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  CheckCircleIcon,
  MdArrowForward,
  MdSwapHoriz
} from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import { getOAuthUrlForTool } from '../../../api/getOAuthUrlForTool';
import { Loader, Logo } from '../../../common/components';
import {
  clearGlobalAlert,
  setGlobalAlert
} from '../../../common/slices/globalAlertSlice';
import { SYNC_POLL_MAX_ATTEMPTS } from '../constants';
import { OAuthMetaType } from '../types';

const OAuth = ({
  integrationKey,
  label,
  pollerFn,
  syncPoller,
  oAuthMeta: { logo_url: logo, title, feature_list: features, description },
  showAPIToken,
  hasOAuthFailed,
  isSyncInProgress,
  setHasOAuthFailed
}) => {
  const [isOAuthConnecting, setIsOAuthConnecting] = useState(false);
  const dispatch = useDispatch();
  const [authWindow, setAuthWindow] = useState({});
  const authWindowName = 'browser_oauth';
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
            message: `There was some problem connecting to ${label} software`
          })
        );
      } else {
        syncPoller();
      }
      authWindow?.close();
    };
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [
    label,
    dispatch,
    authWindow,
    syncPoller,
    integrationKey,
    setHasOAuthFailed
  ]);

  const handleAPIConnect = () => {
    showAPIToken();
  };

  const handleOAuthConnection = () => {
    getOAuthUrlForTool(integrationKey)
      .then((redirectUri) => {
        dispatch(clearGlobalAlert());
        const childWindow = window.open(
          redirectUri,
          authWindowName,
          'height=640,width=960'
        );
        setAuthWindow(childWindow);

        let timer = null;

        function checkChild() {
          if (childWindow.closed) {
            pollerFn(SYNC_POLL_MAX_ATTEMPTS - 1);
            clearInterval(timer);
          }
        }
        timer = setInterval(checkChild, 500);
      })
      .catch(() => {
        dispatch(clearGlobalAlert());
      });
  };

  if (isOAuthConnecting || isSyncInProgress) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader />
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
                  <p className="flex-1">{feature}</p>
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
