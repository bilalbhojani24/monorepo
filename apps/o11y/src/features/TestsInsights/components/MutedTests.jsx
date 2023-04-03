import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { setAppliedFiltersTagsViaURL } from 'testops/TestFilters/slices/dataSlice';
// import { setTestRuns } from 'testops/TestList/slices/dataSlice';
import { getBuildUUID } from 'features/BuildDetails/slices/selectors';
import { TestInsightsContext } from 'features/TestsInsights/TestInsightsContext';
import { isEmpty } from 'lodash';

import { getMutedStats } from '../slices/selectors';
import { getMutedData } from '../slices/testInsightsSlice';

import WidgetLayoutCard from './WidgetLayoutCard';

export default function MutedTests() {
  const { logInsightsInteractionEvent } = useContext(TestInsightsContext);
  const mutedTestStats = useSelector(getMutedStats);
  const buildId = useSelector(getBuildUUID);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMutedData({ buildId }));
  }, [buildId, dispatch]);

  const navigate = useNavigate();

  const handleFilterRedirect = () => {
    logInsightsInteractionEvent({ interaction: 'muted_clicked' });
    // dispatch(setTestRuns([]));
    window.scroll(0, 0);
    const searchString = `?tab=tests&isMuted=true`;
    navigate({ search: searchString });
    // dispatch(setAppliedFiltersTagsViaURL());
  };
  return (
    <WidgetLayoutCard
      height={16}
      title="Muted Tests"
      showMoreButton
      isLoading={mutedTestStats?.isLoading}
      bigNumberData={mutedTestStats?.data || {}}
      showNoData={isEmpty(mutedTestStats?.data) && !mutedTestStats?.isLoading}
      onClickBigNumber={handleFilterRedirect}
      hasNetworkError={mutedTestStats.hasNetworkError}
      placeholderConfig={{
        size: 'small',
        onClickCTA: () => dispatch(getMutedData({ buildId }))
      }}
      emptyPlaceholderConfig={{
        size: 'small'
      }}
    />
  );
}
