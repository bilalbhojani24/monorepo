import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { O11ySlideover } from 'common/bifrostProxy';
import { SNP_PARAMS_MAPPING } from 'constants/common';
import { hideTestDetailsDrawer } from 'features/TestDetails/utils';
import { getActiveProject } from 'globalSlice/selectors';
import { logOllyEvent } from 'utils/common';

import {
  clearUEDetailsInfo,
  resetUEDetailsActiveTab,
  setIsUEDetailsVisible,
  setShowUEDetailsFor
} from '../slices/dataSlice';
import {
  getIsUEDetailsVisible,
  getShowUEDetailsFor
} from '../slices/selectors';

import SlideOverBody from './SlideOverBody';
import SlideOverHeader from './SlideOverHeader';

const ErrorDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const handleCloseDetails = () => {
    dispatch(setIsUEDetailsVisible(false));
    dispatch(setShowUEDetailsFor(''));
    dispatch(clearUEDetailsInfo());
    dispatch(resetUEDetailsActiveTab());
    dispatch(hideTestDetailsDrawer());
    const searchParams = new URLSearchParams(window?.location.search);
    searchParams.delete(SNP_PARAMS_MAPPING.snpErrorId);
    searchParams.delete(SNP_PARAMS_MAPPING.snpErrorTestId);
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
ErrorDetails.propTypes = {};

export default ErrorDetails;
