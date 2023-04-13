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
  tab,
  mode,
  options,
  attachments,
  discardIssue,
  changeTabTo,
  continueEditing,
  isBeingDiscarded,
  isWorkInProgress,
  scrollWidgetToTop,
  confirmIssueDiscard,
  setIsWorkInProgress,
  isFormBeingSubmitted,
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
        tab={tab}
        mode={mode}
        options={options}
        changeTabTo={changeTabTo}
        attachments={attachments}
        discardIssue={discardIssue}
        integrations={integrations}
        continueEditing={continueEditing}
        isBeingDiscarded={isBeingDiscarded}
        isWorkInProgress={isWorkInProgress}
        scrollWidgetToTop={scrollWidgetToTop}
        confirmIssueDiscard={confirmIssueDiscard}
        setIsWorkInProgress={setIsWorkInProgress}
        isFormBeingSubmitted={isFormBeingSubmitted}
        setIsFormBeingSubmitted={setIsFormBeingSubmitted}
      />
    );
  }
  // user has multiple integrations available
  return null;
};
ListOfIntegrations.propTypes = {
  tab: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  changeTabTo: PropTypes.func.isRequired,
  discardIssue: PropTypes.func.isRequired,
  options: CreateIssueOptionsType.isRequired,
  continueEditing: PropTypes.func.isRequired,
  isBeingDiscarded: PropTypes.bool.isRequired,
  isWorkInProgress: PropTypes.bool.isRequired,
  scrollWidgetToTop: PropTypes.func.isRequired,
  setIsWorkInProgress: PropTypes.func.isRequired,
  confirmIssueDiscard: PropTypes.func.isRequired,
  isFormBeingSubmitted: PropTypes.bool.isRequired,
  setIsFormBeingSubmitted: PropTypes.func.isRequired,
  attachments: PropTypes.arrayOf(PropTypes.string).isRequired
};
export default ListOfIntegrations;
