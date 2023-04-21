import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBuildUUID } from 'features/BuildDetails/slices/selectors';
import { TestInsightsContext } from 'features/TestsInsights/TestInsightsContext';
import isEmpty from 'lodash/isEmpty';

import { getFlakyStats } from '../slices/selectors';
import { getFlakyData } from '../slices/testInsightsSlice';

import WidgetLayoutCard from './WidgetLayoutCard';

export default function Flakiness() {
  const { logInsightsInteractionEvent, applyTestListFilter } =
    useContext(TestInsightsContext);
  const flakyStats = useSelector(getFlakyStats);
  const buildId = useSelector(getBuildUUID);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFlakyData({ buildId }));
  }, [buildId, dispatch]);

  const handleFilterRedirect = () => {
    logInsightsInteractionEvent({ interaction: 'flaky_clicked' });
    applyTestListFilter({ query: `flaky=true` });
  };

  return (
    <WidgetLayoutCard
      isLoading={flakyStats?.isLoading}
      bigNumberData={flakyStats?.data}
      showNoData={isEmpty(flakyStats?.data) && !flakyStats?.isLoading}
      onClickBigNumber={handleFilterRedirect}
      hasNetworkError={flakyStats.hasNetworkError}
      placeholderConfig={{
        size: 'small',
        onClickCTA: () => dispatch(getFlakyData({ buildId }))
      }}
      emptyPlaceholderConfig={{
        size: 'small'
      }}
    />
  );
}
