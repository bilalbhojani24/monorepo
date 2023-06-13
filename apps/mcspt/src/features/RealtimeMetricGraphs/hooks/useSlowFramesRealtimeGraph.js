import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDefaultRealtimeChartOptions } from '@browserstack/mcp-shared';

import { getSlowFramesRealtimeData } from '../slices/realtimeMetricSlice';

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

  const [realtimeSlowFramesChartOptions, setRealtimeSlowFramesChartOptions] =
    useState(null);

  useEffect(() => {
    setRealtimeSlowFramesChartOptions(
      generateRealtimeSlowFramesChartOptions(() => {})
    );
  }, []);

  useEffect(() => {
    setRealtimeSlowFramesChartOptions((prevChartData) => {
      const oldData = { ...prevChartData };
      oldData.series[0].data = [...slowFramesTimeSeriesData];
      return oldData;
    });
  }, [slowFramesTimeSeriesData]);

  return {
    slowFramesTimeSeriesData,
    realtimeSlowFramesChartOptions
  };
};

export default useSlowFramesRealtimeGraph;
