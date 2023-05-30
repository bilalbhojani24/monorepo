import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_CATEGORIES } from 'features/FilterSkeleton/constants';
import {
  getAllAppliedFilters,
  getCurrentFilterCategory,
  getIsFiltersLoading
} from 'features/FilterSkeleton/slices/selectors';
import { getActiveProject } from 'globalSlice/selectors';

import AverageDurationMetric from '../components/AverageDurationMetric';
import AverageFailureRatesMetric from '../components/AverageFailureRatesMetric';
import TotalFailuresMetric from '../components/TotalFailuresMetric';
import { getSnPTestsMetricsData } from '../slices/uiSlice';

const TestsMetrics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const activeProject = useSelector(getActiveProject);
  const appliedFilters = useSelector(getAllAppliedFilters);
  const [chartData, setChartData] = useState({});
  const isFiltersLoading = useSelector(getIsFiltersLoading);
  const currentFilterCategory = useSelector(getCurrentFilterCategory);

  useEffect(() => {
    if (
      !isFiltersLoading &&
      currentFilterCategory === FILTER_CATEGORIES.SUITE_HEALTH_TESTS
    ) {
      setIsLoading(true);
      dispatch(
        getSnPTestsMetricsData({
          normalisedName: activeProject?.normalisedName
        })
      )
        .unwrap()
        .then((res) => {
          setChartData(res);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [
    activeProject?.normalisedName,
    dispatch,
    appliedFilters,
    isFiltersLoading,
    currentFilterCategory
  ]);

  return (
    <div className="flex items-center gap-5 px-6 pb-4">
      <TotalFailuresMetric
        isLoading={isLoading}
        data={chartData.failureChart?.data}
        metric={chartData.failureChart?.insights}
      />
      <AverageDurationMetric
        isLoading={isLoading}
        data={chartData.durationChart?.data}
        metric={chartData.durationChart?.insights}
      />
      <AverageFailureRatesMetric
        isLoading={isLoading}
        data={chartData.failureRateChart?.data}
        metric={chartData.failureRateChart?.insights}
      />
    </div>
  );
};

TestsMetrics.propTypes = {};

export default TestsMetrics;
