import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { O11ySlideover } from 'common/bifrostProxy';
import { SNP_PARAMS_MAPPING } from 'constants/common';
import { hideTestDetailsDrawer } from 'features/TestDetails/utils';
import { getActiveProject } from 'globalSlice/selectors';
import { logOllyEvent } from 'utils/common';

import {
  clearTestDetailsInfo,
  resetActiveTab,
  setIsSHTestsDetailsVisible
} from '../slices/dataSlice';
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleCloseDetails = () => {
    dispatch(setIsSHTestsDetailsVisible(false));
    dispatch(hideTestDetailsDrawer());
    dispatch(clearTestDetailsInfo());
    dispatch(resetActiveTab());
    const searchParams = new URLSearchParams(window?.location.search);
    searchParams.delete(SNP_PARAMS_MAPPING.snpTestDetails);
    navigate({ search: searchParams.toString() });
  };

  return (
    <O11ySlideover
      show={isVisible}
      backgroundOverlay={false}
      size="5xl"
      onEscPress={handleCloseDetails}
    >
      <SlideOverHeader handleCloseDetails={handleCloseDetails} />
      <SlideOverBody />
    </O11ySlideover>
  );
};

export default TestDetails;
