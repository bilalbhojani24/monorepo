import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { O11yTable, O11yTableBody } from 'common/bifrostProxy';
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
      <div className="flex max-h-12 items-center justify-center">
        <div className="flex flex-1 items-center">
          <O11yLoader text="Fetching data" />
        </div>
      </div>
    );
  }

  if (!testRuns.length) {
    return null;
  }

  return (
    <>
      <O11yTable containerWrapperClass="m-3">
        <TopErrorsBulkUpdateTrigger clusterId={parentId} />
        <O11yTableBody>
          <TestDataItem data={data} />
        </O11yTableBody>
      </O11yTable>
    </>
  );
}

TopErrorsTestRun.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  parentId: PropTypes.string.isRequired
};
