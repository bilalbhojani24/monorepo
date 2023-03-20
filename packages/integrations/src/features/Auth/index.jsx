import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import APIToken from './APIToken';
import OAuth from './OAuth';
import { APITokenMetaType, OAuthMetaType } from './types';

const IntegrationAuth = ({
  integrationKey,
  label,
  oAuthMeta,
  apiTokenMeta
}) => {
  const [shouldShowFailedAuthMessage, setShowFailedAuthMessage] =
    useState(false);
  const [hasOAuthFailed, setHasOAuthFailed] = useState(false);
  const [isOAuthActive, setIsOAuthActive] = useState(true);
  const showOAuth = () => {
    setIsOAuthActive(true);
  };
  const showAPIToken = () => {
    setIsOAuthActive(false);
  };
  const hideFailedAuthMessage = () => {
    setShowFailedAuthMessage(false);
  };
  useEffect(() => {
    if (hasOAuthFailed && isOAuthActive) {
      setShowFailedAuthMessage(true);
    }
  }, [hasOAuthFailed, isOAuthActive]);

  return isOAuthActive ? (
    <OAuth
      integrationKey={integrationKey}
      label={label}
      oAuthMeta={oAuthMeta}
      showAPIToken={showAPIToken}
      hasOAuthFailed={hasOAuthFailed}
      setHasOAuthFailed={setHasOAuthFailed}
      hideFailedAuthMessage={hideFailedAuthMessage}
      shouldShowFailedAuthMessage={shouldShowFailedAuthMessage}
    />
  ) : (
    <APIToken
      integrationKey={integrationKey}
      label={label}
      apiTokenMeta={apiTokenMeta}
      showOAuth={showOAuth}
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
