import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBuildUUID } from 'features/BuildDetails/slices/selectors';
import { TestInsightsContext } from 'features/TestsInsights/TestInsightsContext';
import isEmpty from 'lodash/isEmpty';

import { getBuildSummaryStats } from '../slices/selectors';
import { getBuildSummaryData } from '../slices/testInsightsSlice';
import { getDonutChartData } from '../utils';

import WidgetLayoutCard from './WidgetLayoutCard';

const getTotalValues = (data = []) => {
  let total = 0;
  data?.forEach((item) => {
    total += item.value;
  });
  return total;
};

const getPrepareChartData = (data = []) => {
  const chartData = [];
  data?.forEach((item) => {
    chartData.push({
      ...item,
      y: item.value,
      sliced: true
    });
  });
  return chartData;
};

export default function BuildSummary() {
  const { logInsightsInteractionEvent, applyTestListFilter } =
    useContext(TestInsightsContext);
  const buildId = useSelector(getBuildUUID);
  const buildSummaryStats = useSelector(getBuildSummaryStats);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBuildSummaryData({ buildId }));
  }, [buildId, dispatch]);

  const handleChartClick = useCallback(
    (data) => {
      if (data?.name) {
        logInsightsInteractionEvent({ interaction: `${data?.name}_clicked` });
        applyTestListFilter({ query: `status=${data.name}` });
      }
    },
    [applyTestListFilter, logInsightsInteractionEvent]
  );
  const handleFlakyClick = useCallback(
    (item) => {
      logInsightsInteractionEvent({ interaction: 'flaky_clicked' });
      let searchString = `flaky=true`;
      if (item) {
        searchString += `&status=${item?.label || item?.name}`;
      }

      applyTestListFilter({ query: searchString });
    },
    [applyTestListFilter, logInsightsInteractionEvent]
  );
  const chartData = useMemo(
    () =>
      getDonutChartData({
        data: getPrepareChartData(buildSummaryStats.data?.data || []),
        onClick: handleChartClick,
        otherOptions: {
          legend: { enabled: false },
          title: {
            text: `<p class="text-5xl text-center">${getTotalValues(
              buildSummaryStats.data?.data || []
            )}</p><p class="text-base font-medium text-center">Tests</p>`,
            verticalAlign: 'middle',
            useHTML: true
          }
        },
        seriesOptions: {
          series: {
            pointWidth: 24
          }
        }
      }),
    [buildSummaryStats.data?.data, handleChartClick]
  );

  const hasNoData = useMemo(
    () => isEmpty(buildSummaryStats?.data) && !buildSummaryStats?.isLoading,
    [buildSummaryStats?.data, buildSummaryStats?.isLoading]
  );

  return (
    <WidgetLayoutCard
      chartOptions={chartData}
      isLoading={buildSummaryStats.isLoading}
      tableData={buildSummaryStats.data?.data || []}
      tableConfig={{
        onClickFlaky: handleFlakyClick,
        onRowCLick: handleChartClick
      }}
      showNoData={hasNoData}
      hasNetworkError={buildSummaryStats.hasNetworkError}
      placeholderConfig={{
        onClickCTA: () => dispatch(getBuildSummaryData({ buildId }))
      }}
    />
  );
}
