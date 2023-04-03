import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getBuildUUID } from 'features/BuildDetails/slices/selectors';
import { TestInsightsContext } from 'features/TestsInsights/TestInsightsContext';
import { isEmpty } from 'lodash';

// import { setAppliedFiltersTagsViaURL } from 'testops/TestFilters/slices/dataSlice';
// import { setTestRuns } from 'testops/TestList/slices/dataSlice';
import { getNewFailureStats } from '../slices/selectors';
import { getNewFailureData } from '../slices/testInsightsSlice';

import WidgetLayoutCard from './WidgetLayoutCard';

export default function NewFailures() {
  const { logInsightsInteractionEvent } = useContext(TestInsightsContext);
  const newFailureStats = useSelector(getNewFailureStats);
  const buildId = useSelector(getBuildUUID);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNewFailureData({ buildId }));
  }, [buildId, dispatch]);

  const history = useNavigate();

  const handleFilterRedirect = () => {
    logInsightsInteractionEvent({ interaction: 'new_failures_clicked' });
    // dispatch(setTestRuns([]));
    window.scroll(0, 0);
    const searchString = `?tab=tests&history=isNewFailure`;
    history.push({ search: searchString });
    // dispatch(setAppliedFiltersTagsViaURL());
  };
  return (
    <WidgetLayoutCard
      title="New Failures"
      showMoreButton
      isLoading={newFailureStats?.isLoading}
      bigNumberData={newFailureStats?.data}
      showNoData={isEmpty(newFailureStats?.data) && !newFailureStats?.isLoading}
      onClickBigNumber={handleFilterRedirect}
      hasNetworkError={newFailureStats.hasNetworkError}
      placeholderConfig={{
        size: 'small',
        onClickCTA: () => dispatch(getNewFailureData({ buildId }))
      }}
      emptyPlaceholderConfig={{
        size: 'small'
      }}
    />
  );
}
