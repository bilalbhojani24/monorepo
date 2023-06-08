import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDefaultRealtimeChartOptions } from '@browserstack/mcp-shared';

import {
  getDiskWriteTimeSeriesData,
  getRealtimeThresholds
} from '../slices/realtimeMetricSlice';

const generateRealtimeDiskWriteChartOptions = (
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
      id: 'diskWriteThreshold',
      color: '#ef4444',
      width: 2,
      value: thresholdValue,
      dashStyle: 'LongDash'
    }
  ];

  chartOptions.series = [
    {
      name: 'Disk Write',
      color: '#4285F4',
      marker: {
        enabled: false
      },
      data: []
    }
  ];

  return chartOptions;
};

const useDiskWriteRealtimeGraph = () => {
  const diskWriteTimeSeriesData = useSelector(getDiskWriteTimeSeriesData);
  const realtimeThresholds = useSelector(getRealtimeThresholds);

  const [realtimeDiskWriteChartOptions, setRealtimeDiskWriteChartOptions] =
    useState(null);

  useEffect(() => {
    setRealtimeDiskWriteChartOptions(
      generateRealtimeDiskWriteChartOptions(
        realtimeThresholds?.diskWriteMbTotal?.value,
        () => {}
      )
    );
  }, [realtimeThresholds]);

  useEffect(() => {
    setRealtimeDiskWriteChartOptions((prevChartData) => {
      const oldData = { ...prevChartData };
      oldData.series[0].data = [...diskWriteTimeSeriesData];
      return oldData;
    });
  }, [diskWriteTimeSeriesData]);

  return {
    diskWriteTimeSeriesData,
    realtimeThresholds,
    realtimeDiskWriteChartOptions
  };
};

export default useDiskWriteRealtimeGraph;
