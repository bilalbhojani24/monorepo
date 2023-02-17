import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getDefaultChartOptions } from '../../../utils';
import { getSessionMetrics } from '../../Report';

const generateBatteryChartOptions = (sessionData) => {
  const chartOptions = getDefaultChartOptions();

  const batteryTimeSeriesData = sessionData?.report?.Battery?.metrics?.map(
    (x) => [x.ts / 1000, x.batteryPercentage]
  );

  chartOptions.chart = {
    type: 'spline',
    height: 140
  };

  chartOptions.tooltip = {
    headerFormat: '<b>{series.name}</b><br/>',
    pointFormat: '<b>Time:</b> {point.x}s</br><b>Value:</b> {point.y:.2f}'
  };

  chartOptions.legend = {
    enabled: false
  };

  chartOptions.series = [
    {
      name: 'Battery Usage',
      color: '#16A34A',
      marker: {
        enabled: false
      },
      data: batteryTimeSeriesData
    }
  ];

  return chartOptions;
};

const useBatteryDetails = () => {
  const sessionData = useSelector(getSessionMetrics);

  const [batteryChartOptions, setBatteryChartOptions] = useState(null);

  useEffect(() => {
    setBatteryChartOptions(generateBatteryChartOptions(sessionData));
  }, [sessionData]);

  return { sessionData, batteryChartOptions };
};

export default useBatteryDetails;
