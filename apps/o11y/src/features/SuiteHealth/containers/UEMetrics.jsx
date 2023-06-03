import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_CATEGORIES } from 'features/FilterSkeleton/constants';
import {
  getAllAppliedFilters,
  getCurrentFilterCategory,
  getIsFiltersLoading
} from 'features/FilterSkeleton/slices/selectors';
import { getActiveProject } from 'globalSlice/selectors';
import PropTypes from 'prop-types';

import TotalImpactedExecutionsMetric from '../components/TotalImpactedExecutionsMetric';
import TotalUniqueErrorMetric from '../components/TotalUniqueErrorMetric';
import UniqueImpactedTestsMetric from '../components/UniqueImpactedTestsMetric';
import { getSnPUEMetricsData } from '../slices/uiSlice';

// #TODO: add click and zoom interaction log events
const UEMetrics = ({ hasNoData }) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const activeProject = useSelector(getActiveProject);
  const appliedFilters = useSelector(getAllAppliedFilters);
  const [chartData, setChartData] = useState({});
  const isFiltersLoading = useSelector(getIsFiltersLoading);
  const currentFilterCategory = useSelector(getCurrentFilterCategory);

  useEffect(() => {
    setIsLoading(true);
    if (
      !isFiltersLoading &&
      currentFilterCategory === FILTER_CATEGORIES.SUITE_HEALTH_UNIQUE_ERRORS
    ) {
      dispatch(
        getSnPUEMetricsData({
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

  if (hasNoData) {
    return null;
  }

  return (
    <div className="flex items-center gap-5 px-6 pb-4">
      <TotalUniqueErrorMetric
        isLoading={isLoading}
        data={chartData.uniqueErrorChart?.data}
        metric={chartData.uniqueErrorChart?.insights}
      />
      <UniqueImpactedTestsMetric
        isLoading={isLoading}
        data={chartData.uniqueTestChart?.data}
        metric={chartData.uniqueTestChart?.insights}
      />
      <TotalImpactedExecutionsMetric
        isLoading={isLoading}
        data={chartData.impactedTestChart?.data}
        metric={chartData.impactedTestChart?.insights}
      />
    </div>
  );
};

UEMetrics.propTypes = {
  hasNoData: PropTypes.bool.isRequired
};

export default UEMetrics;
