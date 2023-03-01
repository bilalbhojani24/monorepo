import React from 'react';
import { useSelector } from 'react-redux';

import IntegrationAuth from '../../Auth';
import { integrationsSelector } from '../../slices/integrationsSlice';

const renderAuth = ({
  key: integrationKey,
  label,
  static_content: {
    oauth_screen: oAuthMeta,
    api_token_screen: apiTokenMeta
  } = {}
}) => (
  <IntegrationAuth
    integrationKey={integrationKey}
    label={label}
    oAuthMeta={oAuthMeta}
    apiTokenMeta={apiTokenMeta}
  />
);

const ListOfIntegrations = () => {
  const integrations = useSelector(integrationsSelector);
  // user has single integration available
  if (integrations.length === 1) {
    const integration = integrations[0];
    // user has the single integration set up
    if (!integration.setup_completed) return renderAuth(integration);
    // user doesn't have the single integration set up
    return null;
  }
  // user has multiple integrations available
  return null;
};
export default ListOfIntegrations;
