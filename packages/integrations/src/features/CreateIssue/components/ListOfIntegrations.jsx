import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import IntegrationAuth from '../../Auth';
import { integrationsSelector } from '../../slices/integrationsSlice';
import { CreateIssueOptionsType } from '../types';

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
  attachments,
  discardIssue,
  changeModeTo,
  continueEditing,
  isBeingDiscarded,
  isWorkInProgress,
  confirmIssueDiscard,
  setIsWorkInProgress,
  setIsFormBeingSubmitted
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
        attachments={attachments}
        discardIssue={discardIssue}
        integrations={integrations}
        changeModeTo={changeModeTo}
        continueEditing={continueEditing}
        isBeingDiscarded={isBeingDiscarded}
        isWorkInProgress={isWorkInProgress}
        confirmIssueDiscard={confirmIssueDiscard}
        setIsWorkInProgress={setIsWorkInProgress}
        setIsFormBeingSubmitted={setIsFormBeingSubmitted}
      />
    );
  }
  // user has multiple integrations available
  return null;
};
ListOfIntegrations.propTypes = {
  mode: PropTypes.string.isRequired,
  changeModeTo: PropTypes.func.isRequired,
  discardIssue: PropTypes.func.isRequired,
  confirmIssueDiscard: PropTypes.isRequired,
  options: CreateIssueOptionsType.isRequired,
  continueEditing: PropTypes.func.isRequired,
  isBeingDiscarded: PropTypes.bool.isRequired,
  isWorkInProgress: PropTypes.bool.isRequired,
  setIsWorkInProgress: PropTypes.func.isRequired,
  setIsFormBeingSubmitted: PropTypes.func.isRequired,
  attachments: PropTypes.arrayOf(PropTypes.string).isRequired
};
export default ListOfIntegrations;
