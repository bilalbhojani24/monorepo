import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { O11ySlideoverHeader } from 'common/bifrostProxy';
import { getActiveProject } from 'globalSlice/selectors';
import PropTypes from 'prop-types';

import { getSnPTestsDetailsInfoData } from '../slices/dataSlice';
import {
  getShowSHTestsDetailsFor,
  getSHTestsDetailsInfo
} from '../slices/selectors';

const TestDetailsHeader = ({ handleCloseDetails }) => {
  const dispatch = useDispatch();

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

  return (
    <O11ySlideoverHeader
      handleDismissClick={handleCloseDetails}
      heading={testDetailsInfo.data?.name || ''}
      headingWrapperClassName="leading-7"
      wrapperClassName="pb-0"
    />
  );
};

TestDetailsHeader.propTypes = {
  handleCloseDetails: PropTypes.func.isRequired
};

export default TestDetailsHeader;
