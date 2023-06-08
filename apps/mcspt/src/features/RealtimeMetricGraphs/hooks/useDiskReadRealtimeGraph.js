import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDefaultRealtimeChartOptions } from '@browserstack/mcp-shared';

import {
  getDiskReadTimeSeriesData,
  getRealtimeThresholds
} from '../slices/realtimeMetricSlice';

const generateRealtimeDiskReadChartOptions = (
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
      id: 'diskReadThreshold',
      color: '#ef4444',
      width: 2,
      value: thresholdValue,
      dashStyle: 'LongDash'
    }
  ];

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
  const realtimeThresholds = useSelector(getRealtimeThresholds);

  const [realtimeDiskReadChartOptions, setRealtimeDiskReadChartOptions] =
    useState(null);

  useEffect(() => {
    setRealtimeDiskReadChartOptions(
      generateRealtimeDiskReadChartOptions(
        realtimeThresholds?.diskReadMbTotal?.value,
        () => {}
      )
    );
  }, [realtimeThresholds]);

  useEffect(() => {
    setRealtimeDiskReadChartOptions((prevChartData) => {
      const oldData = { ...prevChartData };
      oldData.series[0].data = [...diskReadTimeSeriesData];
      return oldData;
    });
  }, [diskReadTimeSeriesData]);

  return {
    diskReadTimeSeriesData,
    realtimeThresholds,
    realtimeDiskReadChartOptions
  };
};

export default useDiskReadRealtimeGraph;
