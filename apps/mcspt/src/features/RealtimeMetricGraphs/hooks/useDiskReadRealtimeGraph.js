import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDefaultRealtimeChartOptions } from '@browserstack/mcp-shared';

import { getDiskReadTimeSeriesData } from '../slices/realtimeMetricSlice';

const generateRealtimeDiskReadChartOptions = (chartGridClicked) => {
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
      name: 'Disk Read',
      color: '#4285F4',
      marker: {
        enabled: false
      },
      data: []
    }
  ];

  return chartOptions;
};

const useDiskReadRealtimeGraph = () => {
  const diskReadTimeSeriesData = useSelector(getDiskReadTimeSeriesData);

  const [realtimeDiskReadChartOptions, setRealtimeDiskReadChartOptions] =
    useState(null);

  useEffect(() => {
    setRealtimeDiskReadChartOptions(
      generateRealtimeDiskReadChartOptions(() => {})
    );
  }, []);

  useEffect(() => {
    setRealtimeDiskReadChartOptions((prevChartData) => {
      const oldData = { ...prevChartData };
      oldData.series[0].data = [...diskReadTimeSeriesData];
      return oldData;
    });
  }, [diskReadTimeSeriesData]);

  return {
    diskReadTimeSeriesData,
    realtimeDiskReadChartOptions
  };
};

export default useDiskReadRealtimeGraph;
