import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDefaultRealtimeChartOptions } from '@browserstack/mcp-shared';

import {
  getCPUTimeSeriesData,
  getRealtimeThresholds
} from '../slices/realtimeMetricSlice';

const generateRealtimeCPUChartOptions = (thresholdValue, chartGridClicked) => {
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
      id: 'cpuMetricThreshold',
      color: '#ef4444',
      width: 2,
      value: thresholdValue,
      dashStyle: 'LongDash'
    }
  ];

  chartOptions.series = [
    {
      name: 'CPU Usage Percentage',
      color: '#4285F4',
      marker: {
        enabled: false
      },
      data: []
    }
  ];

  return chartOptions;
};

const useCPURealtimeGraph = () => {
  const cpuTimeSeriesData = useSelector(getCPUTimeSeriesData);
  const realtimeThresholds = useSelector(getRealtimeThresholds);

  const [realtimeCpuChartOptions, setRealtimeCpuChartOptions] = useState(null);

  useEffect(() => {
    setRealtimeCpuChartOptions(
      generateRealtimeCPUChartOptions(
        realtimeThresholds?.cpuUsagePercentageAvg?.value,
        () => {}
      )
    );
  }, [realtimeThresholds]);

  useEffect(() => {
    setRealtimeCpuChartOptions((prevChartData) => {
      const oldData = { ...prevChartData };
      oldData.series[0].data = [...cpuTimeSeriesData];
      return oldData;
    });
  }, [cpuTimeSeriesData]);

  return { cpuTimeSeriesData, realtimeThresholds, realtimeCpuChartOptions };
};

export default useCPURealtimeGraph;
