import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { O11ySlideover, O11ySlideoverHeader } from 'common/bifrostProxy';
import { getActiveProject } from 'globalSlice/selectors';
import { logOllyEvent } from 'utils/common';

import {
  getIsSnPErrorDetailsVisible,
  getShowSnPErrorDetailsFor
} from '../slices/selectors';

const ErrorDetails = () => {
  const isVisible = useSelector(getIsSnPErrorDetailsVisible);
  const activeProject = useSelector(getActiveProject);
  const { testId } = useSelector(getShowSnPErrorDetailsFor);

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
      <O11ySlideoverHeader>Header</O11ySlideoverHeader>
      Error details
    </O11ySlideover>
  );
};
ErrorDetails.propTypes = {};

export default ErrorDetails;
