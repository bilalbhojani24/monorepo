import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { O11ySlideover } from 'common/bifrostProxy';
import { getIsFiltersLoading } from 'features/FilterSkeleton/slices/selectors';
import { getActiveProject } from 'globalSlice/selectors';
import { logOllyEvent } from 'utils/common';

import {
  getIsSHTestsDetailsVisible,
  getShowSHTestsDetailsFor
} from '../slices/selectors';

import SlideOverBody from './SlideOverBody';
import SlideOverHeader from './SlideOverHeader';

const TestDetails = () => {
  const isVisible = useSelector(getIsSHTestsDetailsVisible);
  const activeProject = useSelector(getActiveProject);
  const testId = useSelector(getShowSHTestsDetailsFor);
  const isFiltersLoading = useSelector(getIsFiltersLoading);

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
      {!isFiltersLoading && (
        <>
          <SlideOverHeader />
          <SlideOverBody />
        </>
      )}
    </O11ySlideover>
  );
};

export default TestDetails;
