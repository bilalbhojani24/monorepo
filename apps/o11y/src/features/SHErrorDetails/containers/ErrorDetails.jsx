import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { O11ySlideover } from 'common/bifrostProxy';
import { getActiveProject } from 'globalSlice/selectors';
import { logOllyEvent } from 'utils/common';

import {
  getIsUEDetailsVisible,
  getShowUEDetailsFor
} from '../slices/selectors';

import SlideOverBody from './SlideOverBody';
import SlideOverHeader from './SlideOverHeader';

const ErrorDetails = () => {
  const isVisible = useSelector(getIsUEDetailsVisible);
  const activeProject = useSelector(getActiveProject);
  const { testId } = useSelector(getShowUEDetailsFor);

  useEffect(() => {
    logOllyEvent({
      event: 'O11ySuiteHealthErrorsTimelineVisited',
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
ErrorDetails.propTypes = {};

export default ErrorDetails;
