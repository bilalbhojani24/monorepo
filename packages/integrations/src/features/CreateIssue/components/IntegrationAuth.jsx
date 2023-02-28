import React, { useState } from 'react';
import PropTypes from 'prop-types';

import APIToken from './APIToken';
import OAuth from './OAuth';
import { APITokenMetaType, OAuthMetaType } from './types';

const IntegrationAuth = ({ label, oAuthMeta, apiTokenMeta }) => {
  const [shouldShowFailedAuthMessage, setShowFailedAuthMessage] =
    useState(true);
  const [hasOAuthFailed, setHasOAuthFailed] = useState(true);
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

  return isOAuthActive ? (
    <OAuth
      label={label}
      oAuthMeta={oAuthMeta}
      showAPIToken={showAPIToken}
      hasOAuthFailed={hasOAuthFailed}
      setHasOAuthFailed={setHasOAuthFailed}
      hideFailedAuthMessage={hideFailedAuthMessage}
      shouldShowFailedAuthMessage={shouldShowFailedAuthMessage}
    />
  ) : (
    <APIToken label={label} apiTokenMeta={apiTokenMeta} showOAuth={showOAuth} />
  );
};

IntegrationAuth.propTypes = {
  label: PropTypes.string.isRequired,
  oAuthMeta: PropTypes.shape(OAuthMetaType),
  apiTokenMeta: PropTypes.shape(APITokenMetaType)
};

IntegrationAuth.defaultProps = {
  oAuthMeta: {},
  apiTokenMeta: {}
};

export default IntegrationAuth;
