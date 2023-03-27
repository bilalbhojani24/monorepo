import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { O11yBadge, O11ySlideoverHeader } from 'common/bifrostProxy';
import StatusIcon from 'common/StatusIcon';
import { getActiveProject } from 'globalSlice/selectors';
import PropTypes from 'prop-types';

import { getTestMetaData } from '../slices/dataSlice';
import { getShowTestDetailsFor, getTestMeta } from '../slices/selectors';
import {
  setCurrentTestRunId,
  setIsTestDetailsVisible,
  setShowTestDetailsFor
} from '../slices/uiSlice';

const TestDetailsHeading = ({ testMeta }) => (
  <div className="flex flex-wrap items-center gap-1">
    {testMeta.data?.status && <StatusIcon status={testMeta.data?.status} />}
    <p className="text-base-900 text-lg font-medium leading-7">
      {testMeta.data?.testName}
    </p>
    {testMeta.data?.isFlaky && (
      <O11yBadge text="Flaky" isRounded={false} modifier="warn" />
    )}
  </div>
);

TestDetailsHeading.propTypes = {
  testMeta: PropTypes.objectOf(PropTypes.any).isRequired
};

const TestDetailsHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const testRunId = useSelector(getShowTestDetailsFor);
  const activeProject = useSelector(getActiveProject);
  const testMeta = useSelector(getTestMeta);

  useEffect(() => {
    if (testRunId && activeProject?.normalisedName) {
      dispatch(
        getTestMetaData({
          testRunId
        })
      );
      dispatch(setCurrentTestRunId(testRunId));
    }
  }, [dispatch, testRunId, activeProject?.normalisedName]);

  const handleCloseDetails = () => {
    dispatch(setIsTestDetailsVisible(false));
    dispatch(setShowTestDetailsFor(''));

    const searchParams = new URLSearchParams(window?.location.search);
    searchParams.delete('details');
    navigate({ search: searchParams.toString() });
  };

  return (
    <O11ySlideoverHeader
      handleDismissClick={handleCloseDetails}
      heading={<TestDetailsHeading testMeta={testMeta} />}
      headingWrapperClassName="leading-7"
    />
  );
};

export default TestDetailsHeader;
