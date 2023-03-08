import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

import BasicWidget from '../BasicWidget';
import { store } from '../store';

import ListOfIntegrations from './components/ListOfIntegrations';
import { CreateIssueOptionsType } from './types';

const WIDGET_POSITIONS = ['left', 'right'];

export const CreateIssue = ({
  isOpen,
  authUrl,
  options,
  position,
  projectId,
  positionRef,
  handleClose
}) => (
  <BasicWidget
    isOpen={isOpen}
    authUrl={authUrl}
    options={options}
    position={position}
    projectId={projectId}
    positionRef={positionRef}
    handleClose={handleClose}
    componentKey="create-issue"
  >
    <ListOfIntegrations projectId={projectId} />
  </BasicWidget>
);

CreateIssue.propTypes = {
  isOpen: PropTypes.bool,
  authUrl: PropTypes.string.isRequired,
  options: CreateIssueOptionsType,
  position: PropTypes.oneOf(WIDGET_POSITIONS),
  projectId: PropTypes.string,
  positionRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  handleClose: PropTypes.func.isRequired
};
CreateIssue.defaultProps = {
  isOpen: false,
  options: null,
  position: WIDGET_POSITIONS[0],
  projectId: null,
  positionRef: null
};

const CreateIssueWithProvider = ({
  isOpen,
  authUrl,
  options,
  position,
  projectId,
  positionRef,
  handleClose
}) => (
  <Provider store={store}>
    <CreateIssue
      isOpen={isOpen}
      authUrl={authUrl}
      options={options}
      position={position}
      projectId={projectId}
      positionRef={positionRef}
      handleClose={handleClose}
    />
  </Provider>
);
CreateIssueWithProvider.propTypes = CreateIssue.propTypes;

export default CreateIssueWithProvider;
