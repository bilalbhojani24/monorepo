import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { O11ySlideoverHeader } from 'common/bifrostProxy';
import { getActiveProject } from 'globalSlice/selectors';
import PropTypes from 'prop-types';

import { getSnPErrorDetailsInfoData } from '../slices/dataSlice';
import { getShowUEDetailsFor, getUEDetailsInfo } from '../slices/selectors';

const UEDetailsHeader = ({ handleCloseDetails }) => {
  const dispatch = useDispatch();

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

  return (
    <O11ySlideoverHeader
      handleDismissClick={handleCloseDetails}
      heading={errorDetailsInfo?.data?.name || ''}
      headingWrapperClassName="leading-7"
      wrapperClassName="pb-0"
    />
  );
};

UEDetailsHeader.propTypes = {
  handleCloseDetails: PropTypes.func.isRequired
};

export default UEDetailsHeader;
