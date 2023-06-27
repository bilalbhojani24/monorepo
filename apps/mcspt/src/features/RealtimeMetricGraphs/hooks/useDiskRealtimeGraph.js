import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDefaultRealtimeChartOptions } from '@browserstack/mcp-shared';

import {
  getDiskReadTimeSeriesData,
  getDiskWriteTimeSeriesData
} from '../slices/realtimeMetricSlice';

const generateRealtimeDiskChartOptions = (chartGridClicked) => {
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
      name: 'Disk Read',
      color: '#65A30D',
      marker: {
        enabled: false
      },
      data: []
    },
    {
      name: 'Disk Write',
      color: '#E11D48',
      marker: {
        enabled: false
      },
      data: []
    }
  ];

  return chartOptions;
};

const useDiskRealtimeGraph = () => {
  const diskReadTimeSeriesData = useSelector(getDiskReadTimeSeriesData);
  const diskWriteTimeSeriesData = useSelector(getDiskWriteTimeSeriesData);

  const [realtimeDiskChartOptions, setRealtimeDiskChartOptions] =
    useState(null);

  useEffect(() => {
    setRealtimeDiskChartOptions(generateRealtimeDiskChartOptions(() => {}));
  }, []);

  useEffect(() => {
    setRealtimeDiskChartOptions((prevChartData) => {
      const oldData = { ...prevChartData };
      oldData.series[0].data = [...diskReadTimeSeriesData];
      return oldData;
    });
  }, [diskReadTimeSeriesData]);

  useEffect(() => {
    setRealtimeDiskChartOptions((prevChartData) => {
      const oldData = { ...prevChartData };
      oldData.series[1].data = [...diskWriteTimeSeriesData];
      return oldData;
    });
  }, [diskWriteTimeSeriesData]);

  return {
    diskReadTimeSeriesData,
    diskWriteTimeSeriesData,
    realtimeDiskChartOptions
  };
};

export default useDiskRealtimeGraph;
