import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDefaultRealtimeChartOptions } from '@browserstack/mcp-shared';

import {
  getRealtimeThresholds,
  getSlowFramesRealtimeData
} from '../slices/realtimeMetricSlice';

const generateRealtimeSlowFramesChartOptions = (chartGridClicked) => {
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
      name: 'SlowFrames Usage Percentage',
      color: '#4285F4',
      marker: {
        enabled: false
      },
      data: []
    }
  ];

  return chartOptions;
};

const useSlowFramesRealtimeGraph = () => {
  const slowFramesTimeSeriesData = useSelector(getSlowFramesRealtimeData);
  const realtimeThresholds = useSelector(getRealtimeThresholds);

  const [realtimeSlowFramesChartOptions, setRealtimeSlowFramesChartOptions] =
    useState(null);

  useEffect(() => {
    setRealtimeSlowFramesChartOptions(
      generateRealtimeSlowFramesChartOptions(() => {})
    );
  }, [realtimeThresholds]);

  useEffect(() => {
    setRealtimeSlowFramesChartOptions((prevChartData) => {
      const oldData = { ...prevChartData };
      oldData.series[0].data = [...slowFramesTimeSeriesData];
      return oldData;
    });
  }, [slowFramesTimeSeriesData]);

  return {
    slowFramesTimeSeriesData,
    realtimeThresholds,
    realtimeSlowFramesChartOptions
  };
};

export default useSlowFramesRealtimeGraph;
