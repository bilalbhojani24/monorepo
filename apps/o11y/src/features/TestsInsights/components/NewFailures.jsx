import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBuildUUID } from 'features/BuildDetails/slices/selectors';
import { TestInsightsContext } from 'features/TestsInsights/TestInsightsContext';
import isEmpty from 'lodash/isEmpty';

import { getNewFailureStats } from '../slices/selectors';
import { getNewFailureData } from '../slices/testInsightsSlice';

import WidgetLayoutCard from './WidgetLayoutCard';

export default function NewFailures() {
  const { logInsightsInteractionEvent, applyTestListFilter } =
    useContext(TestInsightsContext);
  const newFailureStats = useSelector(getNewFailureStats);
  const buildId = useSelector(getBuildUUID);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNewFailureData({ buildId }));
  }, [buildId, dispatch]);

  const handleFilterRedirect = () => {
    logInsightsInteractionEvent({ interaction: 'new_failures_clicked' });
    applyTestListFilter({ query: `history=isNewFailure` });
  };
  return (
    <WidgetLayoutCard
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
