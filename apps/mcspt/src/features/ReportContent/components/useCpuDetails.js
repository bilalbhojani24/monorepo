import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getDefaultChartOptions } from '../../../utils';
import { getSessionMetrics } from '../../Report';

const generateCPUChartOptions = (sessionData) => {
  const chartOptions = getDefaultChartOptions();

  const cpuTimeSeriesData = sessionData?.report?.CPU?.metrics?.map((x) => [
    x.ts / 1000,
    x.cpuUsagePercentage
  ]);

  chartOptions.chart = {
    type: 'spline',
    height: 182,
    spacingBottom: 0
  };

  chartOptions.tooltip = {
    headerFormat: '<b>{series.name}</b><br/>',
    pointFormat: '<b>Time:</b> {point.x}s</br><b>Value:</b> {point.y:.2f}'
  };

  chartOptions.legend = {
    enabled: true,
    marginTop: 16,
    marginBottom: 0
  };

  chartOptions.series = [
    {
      name: 'CPU',
      color: '#0284C7',
      marker: {
        enabled: false
      },
      data: cpuTimeSeriesData
    }
  ];

  return chartOptions;
};

const useCpuDetails = () => {
  const sessionData = useSelector(getSessionMetrics);

  const [cpuChartOptions, setCpuChartOptions] = useState(null);

  useEffect(() => {
    setCpuChartOptions(generateCPUChartOptions(sessionData));
  }, [sessionData]);

  return { sessionData, cpuChartOptions };
};

export default useCpuDetails;
