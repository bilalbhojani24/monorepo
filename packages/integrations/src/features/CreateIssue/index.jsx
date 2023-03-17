import React, { useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import { Button } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import BasicWidget from '../BasicWidget';
import { integrationsSelector } from '../slices/integrationsSlice';
import { store } from '../store';

import DiscardIssue from './components/DiscardIssue';
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
}) => {
  const integrations = useSelector(integrationsSelector);
  const hasAtLeastOneIntegrationSetup = integrations?.some(
    ({ setup_completed: integrated }) => integrated
  );

  // const [mode, setMode] = useState('create');

  const [isBeingDiscarded, setIsBeingDiscarded] = useState(false);

  const continueEditing = () => {
    setIsBeingDiscarded(false);
  };

  const discardIssue = () => {
    setIsBeingDiscarded(true);
  };

  return (
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
      <div
        className={'bg-white overflow-auto'.concat(
          hasAtLeastOneIntegrationSetup ? ' p-6' : ''
        )}
        style={{ maxHeight: '650px' }}
      >
        <ListOfIntegrations
          projectId={projectId}
          options={options}
          // mode={mode}
          isBeingDiscarded={isBeingDiscarded}
          continueEditing={continueEditing}
          closeWidget={handleClose}
        />
      </div>
      {hasAtLeastOneIntegrationSetup && !isBeingDiscarded && (
        <div className="border-base-200 fixed bottom-0 flex w-full justify-end border-t py-4 px-5">
          <Button wrapperClassName="mr-4" colors="white" onClick={discardIssue}>
            Cancel
          </Button>
          <Button type="submit" form="form-builder">
            Create Issue
          </Button>
        </div>
      )}
    </BasicWidget>
  );
};

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
