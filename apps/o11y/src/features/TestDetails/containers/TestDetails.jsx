import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { O11ySlideover } from 'common/bifrostProxy';
import { getActiveProject } from 'globalSlice/selectors';
import PropTypes from 'prop-types';
import { logOllyEvent } from 'utils/common';

import { TEST_DETAILS_CONTEXT } from '../contexts/TestDetailsContext';
import {
  getCurrentTestRunId,
  getIsTestDetailsVisible,
  getShowTestDetailsFor
} from '../slices/selectors';

import SlideOverBody from './SlideOverBody';
import SlideOverHeader from './SlideOverHeader';

const TestDetails = ({ source }) => {
  const isVisible = useSelector(getIsTestDetailsVisible);
  const activeProject = useSelector(getActiveProject);
  const testId = useSelector(getShowTestDetailsFor);
  const currentTestRunId = useSelector(getCurrentTestRunId); // #TODO: CHECK behaviour

  useEffect(() => {
    logOllyEvent({
      event: 'O11yTestDetailsVisited',
      data: {
        project_name: activeProject.name,
        project_id: activeProject.id,
        test_id: testId,
        source
      }
    });
  }, [activeProject.name, activeProject.id, testId, source]);

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

  return (
    <O11ySlideover show={isVisible} backgroundOverlay={false} size="3xl">
      <TEST_DETAILS_CONTEXT.Provider value={{ handleLogTDInteractionEvent }}>
        <SlideOverHeader />
        <SlideOverBody />
      </TEST_DETAILS_CONTEXT.Provider>
    </O11ySlideover>
  );
};

TestDetails.propTypes = {
  source: PropTypes.string.isRequired
};

export default TestDetails;
