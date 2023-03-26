import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import { Button } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import { GlobalAlert } from '../../common/components';
import BasicWidget from '../BasicWidget';
import { integrationsSelector } from '../slices/integrationsSlice';
import { store } from '../store';

import { ISSUE_MODES } from './components/constants';
import ListOfIntegrations from './components/ListOfIntegrations';
import { CreateIssueOptionsType } from './types';

const WIDGET_POSITIONS = ['left', 'right'];

export const CreateIssue = ({
  isOpen,
  auth,
  options,
  position,
  projectId,
  positionRef,
  handleClose,
  attachments = []
}) => {
  const integrations = useSelector(integrationsSelector);
  const hasAtLeastOneIntegrationSetup = integrations?.some(
    ({ setup_completed: integrated }) => integrated
  );

  const [isBeingDiscarded, setIsBeingDiscarded] = useState(false);
  const [isWorkInProgress, setIsWorkInProgress] = useState(false);
  const [mode, setMode] = useState(ISSUE_MODES.CREATION);
  const previousModeRef = useRef(null);

  const continueEditing = () => {
    if (previousModeRef.current) {
      setMode(previousModeRef.current);
      previousModeRef.current = null;
    }
    setIsBeingDiscarded(false);
  };

  const discardIssue = () => {
    setIsBeingDiscarded(true);
  };
  const confirmIssueDiscard = useCallback(() => {
    if (previousModeRef.current) {
      previousModeRef.current = null;
    } else {
      handleClose();
    }
    setIsBeingDiscarded(false);
    setIsWorkInProgress(false);
  }, [handleClose]);

  useEffect(() => {
    if (isBeingDiscarded && !isWorkInProgress) {
      confirmIssueDiscard();
    }
  }, [isBeingDiscarded, isWorkInProgress, confirmIssueDiscard]);

  const changeModeTo = (nextMode) => {
    if (isWorkInProgress) {
      discardIssue();
      previousModeRef.current = mode;
    }
    setMode(nextMode);
  };

  return (
    <BasicWidget
      isOpen={isOpen}
      auth={auth}
      options={options}
      position={position}
      projectId={projectId}
      positionRef={positionRef}
      handleClose={discardIssue}
      componentKey="create-issue"
    >
      <div
        className={'bg-white overflow-auto'.concat(
          hasAtLeastOneIntegrationSetup ? ' p-6' : ''
        )}
        style={{ maxHeight: '650px' }}
      >
        <div className="pb-6">
          <GlobalAlert />
        </div>
        <ListOfIntegrations
          mode={mode}
          options={options}
          projectId={projectId}
          attachments={attachments}
          changeModeTo={changeModeTo}
          continueEditing={continueEditing}
          isBeingDiscarded={isBeingDiscarded}
          confirmIssueDiscard={confirmIssueDiscard}
          setIsWorkInProgress={setIsWorkInProgress}
        />
      </div>
      {hasAtLeastOneIntegrationSetup && !isBeingDiscarded && (
        <div className="border-base-200 fixed bottom-0 flex w-full justify-end border-t py-4 px-5">
          <Button wrapperClassName="mr-4" colors="white" onClick={discardIssue}>
            Cancel
          </Button>
          <Button type="submit" form="form-builder">
            {mode === ISSUE_MODES.CREATION ? 'Create Issue' : 'Update Issue'}
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
  auth,
  options,
  position,
  projectId,
  positionRef,
  handleClose,
  attachments
}) => (
  <Provider store={store}>
    <CreateIssue
      isOpen={isOpen}
      auth={auth}
      options={options}
      position={position}
      projectId={projectId}
      positionRef={positionRef}
      handleClose={handleClose}
      attachments={attachments}
    />
  </Provider>
);
CreateIssueWithProvider.propTypes = CreateIssue.propTypes;

export default CreateIssueWithProvider;
