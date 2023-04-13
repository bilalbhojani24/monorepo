import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBuildUUID } from 'features/BuildDetails/slices/selectors';
import { TestInsightsContext } from 'features/TestsInsights/TestInsightsContext';
import isEmpty from 'lodash/isEmpty';

import { getMutedStats } from '../slices/selectors';
import { getMutedData } from '../slices/testInsightsSlice';

import WidgetLayoutCard from './WidgetLayoutCard';

export default function MutedTests() {
  const { logInsightsInteractionEvent, applyTestListFilter } =
    useContext(TestInsightsContext);
  const mutedTestStats = useSelector(getMutedStats);
  const buildId = useSelector(getBuildUUID);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMutedData({ buildId }));
  }, [buildId, dispatch]);

  const handleFilterRedirect = () => {
    logInsightsInteractionEvent({ interaction: 'muted_clicked' });
    applyTestListFilter({ query: `isMuted=true` });
  };
  return (
    <WidgetLayoutCard
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
