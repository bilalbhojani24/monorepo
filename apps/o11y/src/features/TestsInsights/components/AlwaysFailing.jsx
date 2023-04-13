import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBuildUUID } from 'features/BuildDetails/slices/selectors';
import { TestInsightsContext } from 'features/TestsInsights/TestInsightsContext';
import isEmpty from 'lodash/isEmpty';

import { getAlwaysFailingStats } from '../slices/selectors';
import { getAlwaysFailingData } from '../slices/testInsightsSlice';

import WidgetLayoutCard from './WidgetLayoutCard';

export default function AlwaysFailing() {
  const { logInsightsInteractionEvent, applyTestListFilter } =
    useContext(TestInsightsContext);
  const alwaysFailingStats = useSelector(getAlwaysFailingStats);
  const buildId = useSelector(getBuildUUID);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAlwaysFailingData({ buildId }));
  }, [buildId, dispatch]);

  const handleFilterRedirect = () => {
    logInsightsInteractionEvent({ interaction: 'always_failing_clicked' });
    applyTestListFilter({ query: 'history=isAlwaysFailing' });
  };
  return (
    <WidgetLayoutCard
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
