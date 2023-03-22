import React from 'react';
import { useSelector } from 'react-redux';

import IntegrationAuth from '../../Auth';
import { integrationsSelector } from '../../slices/integrationsSlice';

import IssueForm from './IssueForm';

const renderAuth = ({
  key: integrationKey,
  label,
  auth_meta: {
    api_token: { fields }
  },
  static_content: {
    oauth_screen: oAuthMeta,
    api_token_screen: apiTokenMeta
  } = {}
}) => (
  <IntegrationAuth
    integrationKey={integrationKey}
    label={label}
    oAuthMeta={oAuthMeta}
    apiTokenMeta={{ ...apiTokenMeta, fields }}
  />
);

const ListOfIntegrations = ({
  mode,
  options,
  changeModeTo,
  isBeingDiscarded,
  continueEditing,
  setReadyToSubmit,
  confirmIssueDiscard,
  setIsWorkInProgress
}) => {
  const integrations = useSelector(integrationsSelector);
  // user has single integration available
  if (integrations.length === 1) {
    const integration = integrations[0];
    // user doesn't have the single integration set up
    if (!integration.setup_completed) return renderAuth(integration);
    // user has the single integration set up
    return (
      <IssueForm
        mode={mode}
        options={options}
        integrations={integrations}
        changeModeTo={changeModeTo}
        continueEditing={continueEditing}
        isBeingDiscarded={isBeingDiscarded}
        setReadyToSubmit={setReadyToSubmit}
        confirmIssueDiscard={confirmIssueDiscard}
        setIsWorkInProgress={setIsWorkInProgress}
      />
    );
  }
  // user has multiple integrations available
  return null;
};
export default ListOfIntegrations;
