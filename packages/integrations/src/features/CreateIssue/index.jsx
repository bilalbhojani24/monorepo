import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Button } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import { GlobalAlert } from '../../common/components';
import { setConfig } from '../../common/slices/configSlice';
import { clearGlobalAlert } from '../../common/slices/globalAlertSlice';
import { addConfigParams } from '../../utils/addConfigParams';
import BasicWidget from '../BasicWidget';
import { integrationsSelector } from '../slices/integrationsSlice';
import { widgetHeightSelector } from '../slices/widgetSlice';
import { store } from '../store';

import { ISSUE_MODES } from './components/constants';
import ListOfIntegrations from './components/ListOfIntegrations';
import { CreateIssueOptionsType } from './types';

const WIDGET_POSITIONS = ['left', 'right', 'center'];

export const CreateIssue = ({
  auth,
  config,
  isOpen,
  options,
  position,
  projectId,
  positionRef,
  handleClose,
  attachments = []
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const configWithParams = addConfigParams(config);
    dispatch(setConfig(configWithParams));
  }, [config, dispatch]);

  const integrations = useSelector(integrationsSelector);
  const hasAtLeastOneIntegrationSetup = integrations?.some(
    ({ setup_completed: integrated }) => integrated
  );

  const [isBeingDiscarded, setIsBeingDiscarded] = useState(false);
  const [isWorkInProgress, setIsWorkInProgress] = useState(false);
  const [isFormBeingSubmitted, setIsFormBeingSubmitted] = useState(false);
  const [mode, setMode] = useState(ISSUE_MODES.CREATION);
  const [tab, setTab] = useState(ISSUE_MODES.CREATION);
  const discardIssueCB = useRef(null);

  const resetAppState = useCallback(() => {
    setIsBeingDiscarded(false);
    setIsWorkInProgress(false);
    setIsFormBeingSubmitted(false);
    setMode(ISSUE_MODES.CREATION);
    setTab(ISSUE_MODES.CREATION);
    dispatch(clearGlobalAlert());
  }, [dispatch]);

  const continueEditing = useCallback(() => {
    if (tab !== mode) {
      setTab(mode);
    }
    setIsBeingDiscarded(false);
  }, [mode, tab]);

  const discardIssue = useCallback((callback) => {
    if (typeof callback === 'function') {
      discardIssueCB.current = callback;
    }
    setIsBeingDiscarded(true);
  }, []);

  const confirmIssueDiscard = useCallback(() => {
    dispatch(clearGlobalAlert());
    if (tab !== mode) {
      setMode(tab);
    } else if (typeof discardIssueCB.current === 'function') {
      discardIssueCB.current();
      discardIssueCB.current = null;
    } else {
      resetAppState();
      handleClose();
    }

    setIsBeingDiscarded(false);
    setIsWorkInProgress(false);
  }, [dispatch, handleClose, mode, resetAppState, tab]);

  useEffect(() => {
    if (isBeingDiscarded && !isWorkInProgress) {
      confirmIssueDiscard();
    }
  }, [isBeingDiscarded, isWorkInProgress, confirmIssueDiscard]);

  const changeTabTo = useCallback(
    (nextTab) => {
      if (isWorkInProgress) {
        discardIssue();
        setTab(nextTab);
      } else {
        dispatch(clearGlobalAlert());
        setTab(nextTab);
        setMode(nextTab);
      }
    },
    [discardIssue, dispatch, isWorkInProgress]
  );

  const widgetHeight = useSelector(widgetHeightSelector);
  const maxHeight = widgetHeight ? widgetHeight - 120 : 0;
  const containerRef = useRef(null);

  const scrollWidgetToTop = () => {
    if (containerRef?.current) {
      containerRef.current.scrollTop = 0;
    }
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
        ref={containerRef}
        className={'bg-white h-full'.concat(
          hasAtLeastOneIntegrationSetup ? ' p-6' : ' p-1',
          !isBeingDiscarded ? ' overflow-auto' : ''
        )}
        style={{
          maxHeight: hasAtLeastOneIntegrationSetup ? `${maxHeight}px` : 'reset'
        }}
      >
        {!isBeingDiscarded && <GlobalAlert className="pb-6" />}
        <ListOfIntegrations
          tab={tab}
          mode={mode}
          options={options}
          projectId={projectId}
          attachments={attachments}
          changeTabTo={changeTabTo}
          discardIssue={discardIssue}
          continueEditing={continueEditing}
          isWorkInProgress={isWorkInProgress}
          isBeingDiscarded={isBeingDiscarded}
          scrollWidgetToTop={scrollWidgetToTop}
          confirmIssueDiscard={confirmIssueDiscard}
          setIsWorkInProgress={setIsWorkInProgress}
          isFormBeingSubmitted={isFormBeingSubmitted}
          setIsFormBeingSubmitted={setIsFormBeingSubmitted}
        />
      </div>
      {hasAtLeastOneIntegrationSetup && !isBeingDiscarded && (
        <div className="border-base-200 fixed bottom-0 left-0 z-10 flex w-full justify-end border-t bg-white px-5 pb-6 pt-4">
          <Button
            wrapperClassName="mr-4"
            colors="white"
            data-test-id="cancel-issue-btn"
            onClick={discardIssue}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="form-builder"
            data-test-id={
              mode === ISSUE_MODES.CREATION
                ? 'create-issue-btn'
                : 'update-issue-btn'
            }
            loading={isFormBeingSubmitted}
            loaderText={
              mode === ISSUE_MODES.CREATION ? 'Creating...' : 'Updating...'
            }
            disabled={!isWorkInProgress}
          >
            {mode === ISSUE_MODES.CREATION ? 'Create Issue' : 'Update Issue'}
          </Button>
        </div>
      )}
    </BasicWidget>
  );
};

CreateIssue.propTypes = {
  isOpen: PropTypes.bool,
  auth: PropTypes.shape({
    url: PropTypes.string,
    headers: PropTypes.shape({
      [PropTypes.string]: PropTypes.string
    })
  }).isRequired,
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
  position: WIDGET_POSITIONS[2],
  projectId: null,
  positionRef: null
};

const CreateIssueWithProvider = ({
  auth,
  isOpen,
  config,
  options,
  position,
  projectId,
  positionRef,
  handleClose,
  attachments
}) => (
  <Provider store={store}>
    <CreateIssue
      auth={auth}
      config={config}
      isOpen={isOpen}
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
