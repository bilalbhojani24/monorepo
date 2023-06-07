import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { O11ySlideover } from 'common/bifrostProxy';
import { FLOATING_COMPONENTS_IDS } from 'constants/common';
import { getActiveProject } from 'globalSlice/selectors';
import useFloatingComponentTracking from 'hooks/useFloatingComponentTracking';
import PropTypes from 'prop-types';
import { logOllyEvent } from 'utils/common';

import { TEST_DETAILS_CONTEXT } from '../contexts/TestDetailsContext';
import {
  getCurrentTestRunId,
  getIsTestDetailsVisible,
  getShowTestDetailsFor
} from '../slices/selectors';
import {
  setIsTestDetailsVisible,
  setShowTestDetailsFor
} from '../slices/uiSlice';
import { hideTestDetailsDrawer } from '../utils';

import SlideOverBody from './SlideOverBody';
import SlideOverHeader from './SlideOverHeader';

const TestDetails = ({ source }) => {
  const panelRef = useRef(null);

  const isVisible = useSelector(getIsTestDetailsVisible);
  const activeProject = useSelector(getActiveProject);
  const testId = useSelector(getShowTestDetailsFor);
  const currentTestRunId = useSelector(getCurrentTestRunId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isVisible) {
      logOllyEvent({
        event: 'O11yTestDetailsVisited',
        data: {
          project_name: activeProject.name,
          project_id: activeProject.id,
          test_id: testId,
          source
        }
      });
    }
  }, [activeProject.name, activeProject.id, testId, source, isVisible]);

  const handleLogTDInteractionEvent = useCallback(
    ({ event = 'O11yTestDetailsInteracted', interaction }) => {
      logOllyEvent({
        event,
        data: {
          project_name: activeProject.name,
          project_id: activeProject.id,
          source,
          test_id: currentTestRunId,
          interaction
        }
      });
    },
    [activeProject.id, activeProject.name, source, currentTestRunId]
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const testDetails = searchParams.get('details');
    if (testDetails) {
      dispatch(setIsTestDetailsVisible(true));
      dispatch(setShowTestDetailsFor(testDetails));
    }
    return () => {
      dispatch(setIsTestDetailsVisible(false));
    };
  }, [dispatch]);

  const handleCloseDetails = () => {
    dispatch(hideTestDetailsDrawer());
    const searchParams = new URLSearchParams(window?.location.search);
    searchParams.delete('details');
    navigate({ search: searchParams.toString() });
  };

  useFloatingComponentTracking(isVisible, FLOATING_COMPONENTS_IDS.TEST_DETAILS);

  return (
    <O11ySlideover
      show={isVisible}
      backgroundOverlay={false}
      size="3xl"
      onEscPress={() => {
        if (isVisible) {
          handleCloseDetails();
        }
      }}
    >
      <TEST_DETAILS_CONTEXT.Provider
        value={{ handleLogTDInteractionEvent, panelRef }}
      >
        {isVisible && (
          <>
            <SlideOverHeader handleCloseDetails={handleCloseDetails} />
            <SlideOverBody />
          </>
        )}
      </TEST_DETAILS_CONTEXT.Provider>
    </O11ySlideover>
  );
};

TestDetails.propTypes = {
  source: PropTypes.string.isRequired
};

export default TestDetails;
