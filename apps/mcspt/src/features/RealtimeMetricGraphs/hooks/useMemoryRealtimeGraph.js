import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDefaultRealtimeChartOptions } from '@browserstack/mcp-shared';

import { getMemoryTimeSeriesData } from '../slices/realtimeMetricSlice';

const generateRealtimeMemoryChartOptions = (chartGridClicked) => {
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
  const memoryTimeSeriesData = useSelector(getMemoryTimeSeriesData);

  const [realtimeMemoryChartOptions, setRealtimeMemoryChartOptions] =
    useState(null);

  useEffect(() => {
    setRealtimeMemoryChartOptions(generateRealtimeMemoryChartOptions(() => {}));
  }, []);

  useEffect(() => {
    setRealtimeMemoryChartOptions((prevChartData) => {
      const oldData = { ...prevChartData };

      oldData.series[0].data = [...memoryTimeSeriesData];

      return oldData;
    });
  }, [memoryTimeSeriesData]);

  return {
    memoryTimeSeriesData,
    realtimeMemoryChartOptions
  };
};

export default useMemoryRealtimeGraph;
