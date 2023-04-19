import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { twClassNames } from '@browserstack/utils';
import { O11yBadge, O11ySlideoverHeader } from 'common/bifrostProxy';
import StatusIcon from 'common/StatusIcon';
import { getActiveProject } from 'globalSlice/selectors';
import PropTypes from 'prop-types';

import { getTestMetaData } from '../slices/dataSlice';
import { getShowTestDetailsFor, getTestMeta } from '../slices/selectors';
import { setCurrentTestRunId } from '../slices/uiSlice';
import { hideTestDetailsDrawer } from '../utils';

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
  const [heading, setHeading] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (testRunId && activeProject?.normalisedName) {
      setLoading(true);
      dispatch(
        getTestMetaData({
          testRunId
        })
      )
        .unwrap()
        .finally(() => {
          setLoading(false);
        });
      dispatch(setCurrentTestRunId(testRunId));
    }
  }, [dispatch, testRunId, activeProject?.normalisedName]);

  useEffect(() => {
    if (testMeta.data?.testName) {
      setHeading(testMeta.data.testName);
    }
  }, [testMeta.data]);

  const handleCloseDetails = () => {
    dispatch(hideTestDetailsDrawer());
    const searchParams = new URLSearchParams(window?.location.search);
    searchParams.delete('details');
    navigate({ search: searchParams.toString() });
  };

  return (
    <O11ySlideoverHeader
      handleDismissClick={handleCloseDetails}
      heading={heading}
      headingWrapperClassName={twClassNames('leading-7', {
        'text-base-400': loading
      })}
      wrapperClassName="pb-0"
    />
  );
};

export default TestDetailsHeader;
