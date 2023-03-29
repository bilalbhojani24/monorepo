import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import O11yLoader from 'common/O11yLoader';
import PropTypes from 'prop-types';

import { clearTestDetails, getTestDetailsData } from '../slices/dataSlice';
import { getCurrentTestRunId, getTestDetails } from '../slices/selectors';
import { clearExceptions } from '../slices/uiSlice';

const TestVideoPlayer = (props) => {
  const dispatch = useDispatch();
  const currentTestRunId = useSelector(getCurrentTestRunId);
  const details = useSelector(getTestDetails);

  const [videoSeekTime, setVideoSeekTime] = useState(-1);

  useEffect(() => {
    if (currentTestRunId) {
      setVideoSeekTime(-1);
      dispatch(clearExceptions());
      dispatch(
        getTestDetailsData({
          testRunId: currentTestRunId
        })
      );
    }
    return () => {
      dispatch(clearTestDetails());
    };
  }, [dispatch, currentTestRunId]);

  if (details.isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <O11yLoader />
      </div>
    );
  }

  return <div>TestVideoPlayer</div>;
};

TestVideoPlayer.propTypes = {};

export default TestVideoPlayer;
