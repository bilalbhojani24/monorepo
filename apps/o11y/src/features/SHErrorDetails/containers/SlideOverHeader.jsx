import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { O11ySlideoverHeader } from 'common/bifrostProxy';
import { SNP_PARAMS_MAPPING } from 'constants/common';
import { getActiveProject } from 'globalSlice/selectors';

import {
  clearUEDetailsInfo,
  getSnPErrorDetailsInfoData,
  resetUEDetailsActiveTab,
  setIsUEDetailsVisible,
  setShowUEDetailsFor
} from '../slices/dataSlice';
import { getShowUEDetailsFor, getUEDetailsInfo } from '../slices/selectors';

const UEDetailsHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { testId, errorId } = useSelector(getShowUEDetailsFor);
  const activeProject = useSelector(getActiveProject);
  const errorDetailsInfo = useSelector(getUEDetailsInfo);
  const mounted = useRef(null);

  useEffect(() => {
    mounted.current = true;
    if (testId && activeProject?.normalisedName) {
      dispatch(
        getSnPErrorDetailsInfoData({
          normalisedName: activeProject?.normalisedName,
          testId,
          errorId
        })
      );
    }
    return () => {
      mounted.current = false;
    };
  }, [dispatch, testId, errorId, activeProject?.normalisedName]);

  const handleCloseDetails = () => {
    dispatch(setIsUEDetailsVisible(false));
    dispatch(setShowUEDetailsFor(''));
    dispatch(clearUEDetailsInfo());
    dispatch(resetUEDetailsActiveTab());
    const searchParams = new URLSearchParams(window?.location.search);
    searchParams.delete(SNP_PARAMS_MAPPING.snpErrorId);
    searchParams.delete(SNP_PARAMS_MAPPING.snpErrorTestId);
    navigate({ search: searchParams.toString() });
  };
  return (
    <O11ySlideoverHeader
      handleDismissClick={handleCloseDetails}
      heading={errorDetailsInfo?.data?.name || ''}
      headingWrapperClassName="leading-7"
      backgroundColorClass="pb-2"
    />
  );
};

export default UEDetailsHeader;
