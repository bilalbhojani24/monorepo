import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getDefaultChartOptions,
  getSessionMetrics
} from '@browserstack/mcp-shared';

import { getMemoryRealtimeData } from '../slices/realtimeMetricSlice';

const generateRealtimeMemoryChartOptions = (chartGridClicked) => {
  const chartOptions = getDefaultChartOptions();

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
  chartOptions.tooltip = {
    headerFormat: '<b>{series.name}</b><br/>',
    pointFormat: '<b>Time:</b> {point.x}s</br><b>Value:</b> {point.y:.2f}'
  };

  chartOptions.legend = {
    enabled: true,
    marginTop: 16,
    marginBottom: 0
  };

  chartOptions.xAxis.plotLines = [];

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
  const sessionData = useSelector(getSessionMetrics);
  const memoryTimeSeriesData = useSelector(getMemoryRealtimeData);

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

  return { sessionData, realtimeMemoryChartOptions };
};

export default useMemoryRealtimeGraph;
