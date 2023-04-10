import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import O11yLoader from 'common/O11yLoader';
import { getBuildUUID } from 'features/BuildDetails/slices/selectors';
import TestDataItem from 'features/TestsInsights/components/TestDataItem';
import { getTopErrorsTestRuns } from 'features/TestsInsights/slices/selectors';
import { getTopErrorsTestRunsData } from 'features/TestsInsights/slices/testInsightsSlice';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';

import TopErrorsBulkUpdateTrigger from './TopErrorsBulkUpdateTrigger';

export default function TopErrorsTestRun({ data, parentId }) {
  const testRuns = useSelector((state) =>
    getTopErrorsTestRuns(state, parentId)
  );
  const buildId = useSelector(getBuildUUID);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isEmpty(testRuns)) {
      setIsLoading(true);
      dispatch(getTopErrorsTestRunsData({ buildId, statId: parentId }))
        .unwrap()
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [buildId, dispatch, parentId, testRuns]);

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center">
        <O11yLoader
          text="Fetching data"
          loaderClass="w-6 h-6"
          textClass="text-base"
          wrapperClassName="my-3"
        />
      </div>
    );
  }

  if (!testRuns.length) {
    return null;
  }

  return (
    <>
      <TopErrorsBulkUpdateTrigger clusterId={parentId} />
      <TestDataItem data={data} />
    </>
  );
}

TopErrorsTestRun.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  parentId: PropTypes.string.isRequired
};
