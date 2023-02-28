import React from 'react';
import PropTypes from 'prop-types';

import IntegrationAuth from './IntegrationAuth';

const renderAuth = ({
  label,
  static_content: {
    oauth_screen: oAuthMeta,
    api_token_screen: apiTokenMeta
  } = {}
}) => (
  <IntegrationAuth
    label={label}
    oAuthMeta={oAuthMeta}
    apiTokenMeta={apiTokenMeta}
  />
);

const ListOfIntegrations = ({ integrations }) => {
  if (integrations.length === 1) {
    return renderAuth(integrations[0]);
  }
  return null;
};

const IntegrationType = PropTypes.shape({
  label: PropTypes.string,
  icon: PropTypes.string
});

ListOfIntegrations.propTypes = {
  integrations: PropTypes.arrayOf(IntegrationType)
};

ListOfIntegrations.defaultProps = {
  integrations: []
};
export default ListOfIntegrations;
