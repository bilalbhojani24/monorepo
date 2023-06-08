import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDefaultRealtimeChartOptions } from '@browserstack/mcp-shared';

import {
  getMemoryTimeSeriesData,
  getRealtimeThresholds
} from '../slices/realtimeMetricSlice';

const generateRealtimeMemoryChartOptions = (
  thresholdValue,
  chartGridClicked
) => {
  const chartOptions = getDefaultRealtimeChartOptions();

  chartOptions.chart = {
    type: 'spline',
    height: 182,
    spacingBottom: 0,
    events: {
      click: chartGridClicked
    }
  };

  chartOptions.plotOptions = {
    spline: {
      point: {
        events: {
          click: chartGridClicked
        }
      }
    }
  };

  chartOptions.yAxis.plotLines = [
    {
      id: 'memoryUsageThreshold',
      color: '#ef4444',
      width: 2,
      value: thresholdValue,
      dashStyle: 'LongDash'
    }
  ];

  chartOptions.series = [
    {
      name: 'Memory Usage (MB)',
      color: '#4285F4',
      marker: {
        enabled: false
      },
      data: []
    }
  ];

  return chartOptions;
};

const useMemoryRealtimeGraph = () => {
  const realtimeThresholds = useSelector(getRealtimeThresholds);
  const memoryTimeSeriesData = useSelector(getMemoryTimeSeriesData);

  const [realtimeMemoryChartOptions, setRealtimeMemoryChartOptions] =
    useState(null);

  useEffect(() => {
    setRealtimeMemoryChartOptions(
      generateRealtimeMemoryChartOptions(
        realtimeThresholds?.memoryUsageMbAvg?.value,
        () => {}
      )
    );
  }, [realtimeThresholds]);

  useEffect(() => {
    setRealtimeMemoryChartOptions((prevChartData) => {
      const oldData = { ...prevChartData };

      oldData.series[0].data = [...memoryTimeSeriesData];

      return oldData;
    });
  }, [memoryTimeSeriesData]);

  return {
    memoryTimeSeriesData,
    realtimeThresholds,
    realtimeMemoryChartOptions
  };
};

export default useMemoryRealtimeGraph;
