import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDefaultRealtimeChartOptions } from '@browserstack/mcp-shared';

import {
  getFPSTimeSeriesData,
  getRealtimeThresholds
} from '../slices/realtimeMetricSlice';

const generateRealtimeFPSChartOptions = (chartGridClicked) => {
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
      name: 'FPS',
      color: '#4285F4',
      marker: {
        enabled: false
      },
      data: []
    }
  ];

  return chartOptions;
};

const useFPSRealtimeGraph = () => {
  const fpsTimeSeriesData = useSelector(getFPSTimeSeriesData);
  const realtimeThresholds = useSelector(getRealtimeThresholds);

  const [realtimeFpsChartOptions, setRealtimeFpsChartOptions] = useState(null);

  useEffect(() => {
    setRealtimeFpsChartOptions(generateRealtimeFPSChartOptions(() => {}));
  }, [realtimeThresholds]);

  useEffect(() => {
    setRealtimeFpsChartOptions((prevChartData) => {
      const oldData = { ...prevChartData };
      oldData.series[0].data = [...fpsTimeSeriesData];
      return oldData;
    });
  }, [fpsTimeSeriesData]);

  return { fpsTimeSeriesData, realtimeFpsChartOptions };
};

export default useFPSRealtimeGraph;
