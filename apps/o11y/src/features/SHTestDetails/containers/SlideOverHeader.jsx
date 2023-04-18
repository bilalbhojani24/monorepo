import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { O11ySlideoverHeader } from 'common/bifrostProxy';
import { SNP_PARAMS_MAPPING } from 'constants/common';
import { getActiveProject } from 'globalSlice/selectors';

import {
  clearTestDetailsInfo,
  getSnPTestsDetailsInfoData,
  resetActiveTab,
  setIsSHTestsDetailsVisible,
  setShowSHTestsDetailsFor
} from '../slices/dataSlice';
import {
  getShowSHTestsDetailsFor,
  getSHTestsDetailsInfo
} from '../slices/selectors';

const TestDetailsHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const testId = useSelector(getShowSHTestsDetailsFor);
  const activeProject = useSelector(getActiveProject);
  const testDetailsInfo = useSelector(getSHTestsDetailsInfo);
  const mounted = useRef(null);

  useEffect(() => {
    mounted.current = true;
    if (testId && activeProject?.normalisedName) {
      dispatch(
        getSnPTestsDetailsInfoData({
          normalisedName: activeProject?.normalisedName,
          testId
        })
      );
    }
    return () => {
      mounted.current = false;
    };
  }, [dispatch, testId, activeProject?.normalisedName]);

  const handleCloseDetails = () => {
    dispatch(setIsSHTestsDetailsVisible(false));
    dispatch(setShowSHTestsDetailsFor(''));
    dispatch(clearTestDetailsInfo());
    dispatch(resetActiveTab());
    const searchParams = new URLSearchParams(window?.location.search);
    searchParams.delete(SNP_PARAMS_MAPPING.snpTestDetails);
    navigate({ search: searchParams.toString() });
  };
  return (
    <O11ySlideoverHeader
      handleDismissClick={handleCloseDetails}
      heading={testDetailsInfo.data?.name || ''}
      headingWrapperClassName="leading-7"
      wrapperClassName="pb-0"
    />
  );
};

export default TestDetailsHeader;
