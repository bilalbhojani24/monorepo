import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDefaultRealtimeChartOptions } from '@browserstack/mcp-shared';

import {
  getBatteryTimeSeriesData,
  getRealtimeThresholds
} from '../slices/realtimeMetricSlice';

const generateRealtimeBatteryChartOptions = (chartGridClicked) => {
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
      name: 'Battery Consumed (mAh)',
      color: '#4285F4',
      marker: {
        enabled: false
      },
      data: []
    }
  ];

  return chartOptions;
};

const useBatteryRealtimeGraph = () => {
  const batteryTimeSeriesData = useSelector(getBatteryTimeSeriesData);
  const realtimeThresholds = useSelector(getRealtimeThresholds);

  const [realtimeBatteryChartOptions, setRealtimeBatteryChartOptions] =
    useState(null);

  useEffect(() => {
    setRealtimeBatteryChartOptions(
      generateRealtimeBatteryChartOptions(() => {})
    );
  }, [realtimeThresholds]);

  useEffect(() => {
    setRealtimeBatteryChartOptions((prevChartData) => {
      const oldData = { ...prevChartData };
      oldData.series[0].data = [...batteryTimeSeriesData];
      return oldData;
    });
  }, [batteryTimeSeriesData]);

  return {
    batteryTimeSeriesData,
    realtimeBatteryChartOptions
  };
};

export default useBatteryRealtimeGraph;
