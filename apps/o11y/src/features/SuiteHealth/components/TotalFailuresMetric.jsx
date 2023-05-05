import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveProject } from 'globalSlice/selectors';

import { getSnPTestsFailuresMetricsData } from '../slices/uiSlice';

import StatsCard from './StatsCard';

const TotalFailuresMetric = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const activeProject = useSelector(getActiveProject);
  //   const [chartPoints, setChartPoints] = useState([]);
  const [metricInfo, setMetricInfo] = useState({});

  useEffect(() => {
    setIsLoading(true);
    dispatch(
      getSnPTestsFailuresMetricsData({
        normalisedName: activeProject?.normalisedName
      })
    )
      .unwrap()
      .then((res) => {
        // setChartPoints(res.data);
        setMetricInfo(res.insights);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [activeProject?.normalisedName, dispatch]);

  return (
    <StatsCard
      title="Total Failures"
      stat={metricInfo.value}
      subText={metricInfo.subText}
      isLoading={isLoading}
    />
  );
};

export default memo(TotalFailuresMetric);
