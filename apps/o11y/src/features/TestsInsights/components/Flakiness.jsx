import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { setAppliedFiltersTagsViaURL } from 'testops/TestFilters/slices/dataSlice';
// import { setTestRuns } from 'testops/TestList/slices/dataSlice';
import { getBuildUUID } from 'features/BuildDetails/slices/selectors';
import { TestInsightsContext } from 'features/TestsInsights/TestInsightsContext';
import isEmpty from 'lodash/isEmpty';

import { getFlakyStats } from '../slices/selectors';
import { getFlakyData } from '../slices/testInsightsSlice';

import WidgetLayoutCard from './WidgetLayoutCard';

export default function Flakiness() {
  const { logInsightsInteractionEvent } = useContext(TestInsightsContext);
  const flakyStats = useSelector(getFlakyStats);
  const buildId = useSelector(getBuildUUID);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFlakyData({ buildId }));
  }, [buildId, dispatch]);

  const navigate = useNavigate();

  const handleFilterRedirect = () => {
    logInsightsInteractionEvent({ interaction: 'flaky_clicked' });
    // dispatch(setTestRuns([]));
    window.scroll(0, 0);
    const searchString = `?tab=tests&flaky=true`;
    navigate({ search: searchString });
    // dispatch(setAppliedFiltersTagsViaURL());
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
