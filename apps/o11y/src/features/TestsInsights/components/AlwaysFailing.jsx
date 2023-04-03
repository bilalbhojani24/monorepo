import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { setAppliedFiltersTagsViaURL } from 'testops/TestFilters/slices/dataSlice';
// import { setTestRuns } from 'testops/TestList/slices/dataSlice';
import { getBuildUUID } from 'features/BuildDetails/slices/selectors';
import { TestInsightsContext } from 'features/TestsInsights/TestInsightsContext';
import { isEmpty } from 'lodash';

import { getAlwaysFailingStats } from '../slices/selectors';
import { getAlwaysFailingData } from '../slices/testInsightsSlice';

import WidgetLayoutCard from './WidgetLayoutCard';

export default function AlwaysFailing() {
  const { logInsightsInteractionEvent } = useContext(TestInsightsContext);
  const alwaysFailingStats = useSelector(getAlwaysFailingStats);
  const buildId = useSelector(getBuildUUID);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAlwaysFailingData({ buildId }));
  }, [buildId, dispatch]);

  const navigate = useNavigate();

  const handleFilterRedirect = () => {
    logInsightsInteractionEvent({ interaction: 'always_failing_clicked' });
    // dispatch(setTestRuns([]));
    window.scroll(0, 0);
    const searchString = `?tab=tests&history=isAlwaysFailing`;
    navigate({ search: searchString });
    // dispatch(setAppliedFiltersTagsViaURL());
  };
  return (
    <WidgetLayoutCard
      title="Always Failing"
      showMoreButton
      isLoading={alwaysFailingStats?.isLoading}
      bigNumberData={alwaysFailingStats?.data}
      showNoData={
        isEmpty(alwaysFailingStats?.data) && !alwaysFailingStats?.isLoading
      }
      onClickBigNumber={handleFilterRedirect}
      hasNetworkError={alwaysFailingStats.hasNetworkError}
      placeholderConfig={{
        size: 'small',
        onClickCTA: () => dispatch(getAlwaysFailingData({ buildId }))
      }}
      emptyPlaceholderConfig={{
        size: 'small'
      }}
    />
  );
}
