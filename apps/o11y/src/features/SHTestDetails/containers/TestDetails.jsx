import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { O11ySlideover } from 'common/bifrostProxy';
import { getActiveProject } from 'globalSlice/selectors';
import { logOllyEvent } from 'utils/common';

import {
  getIsSnPDetailsVisible,
  getShowSnPDetailsFor
} from '../slices/selectors';

import SlideOverBody from './SlideOverBody';
import SlideOverHeader from './SlideOverHeader';

const TestDetails = () => {
  const isVisible = useSelector(getIsSnPDetailsVisible);
  const activeProject = useSelector(getActiveProject);
  const testId = useSelector(getShowSnPDetailsFor);

  useEffect(() => {
    logOllyEvent({
      event: 'O11ySuiteHealthTestsTimelineVisited',
      data: {
        project_name: activeProject.name,
        project_id: activeProject.id,
        test_id: testId
      }
    });
  }, [activeProject.name, activeProject.id, testId]);

  return (
    <O11ySlideover show={isVisible} backgroundOverlay={false} size="5xl">
      <SlideOverHeader />
      <SlideOverBody />
    </O11ySlideover>
  );
};

export default TestDetails;
