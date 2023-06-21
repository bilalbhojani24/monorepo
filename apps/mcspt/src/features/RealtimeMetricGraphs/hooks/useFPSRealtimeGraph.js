import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDefaultRealtimeChartOptions } from '@browserstack/mcp-shared';

import {
  getFPSTimeSeriesData,
  getSlowFramesRealtimeData
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

  chartOptions.legend = {
    enabled: true,
    marginTop: 16,
    marginBottom: 0
  };

  chartOptions.series = [
    {
      name: 'Frames Per Second',
      color: '#4285F4',
      marker: {
        enabled: false
      },
      data: []
    },
    {
      name: 'Slow Frames/Second',
      color: '#C026D3',
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
  const slowFramesTimeSeriesData = useSelector(getSlowFramesRealtimeData);

  const [realtimeFpsChartOptions, setRealtimeFpsChartOptions] = useState(null);

  useEffect(() => {
    setRealtimeFpsChartOptions(generateRealtimeFPSChartOptions(() => {}));
  }, []);

  useEffect(() => {
    setRealtimeFpsChartOptions((prevChartData) => {
      const oldData = { ...prevChartData };
      oldData.series[0].data = [...fpsTimeSeriesData];
      return oldData;
    });
  }, [fpsTimeSeriesData]);

  useEffect(() => {
    setRealtimeFpsChartOptions((prevChartData) => {
      const oldData = { ...prevChartData };
      oldData.series[1].data = [...slowFramesTimeSeriesData];
      return oldData;
    });
  }, [slowFramesTimeSeriesData]);

  return { fpsTimeSeriesData, realtimeFpsChartOptions };
};

export default useFPSRealtimeGraph;
