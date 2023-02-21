import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getDefaultChartOptions } from '../../../utils';
import { getSessionMetrics } from '../../Report';

const generateDiskIOChartOptions = (sessionData) => {
  const chartOptions = getDefaultChartOptions();

  const networkReadTimeSeries = sessionData?.report?.Network?.metrics?.map(
    (x) => [x.ts / 1000, x.networkReadKb]
  );

  const networkWriteTimeSeries = sessionData?.report?.Network?.metrics?.map(
    (x) => [x.ts / 1000, x.networkWriteKb]
  );

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
      name: 'Network Read',
      color: '#65A30D',
      marker: {
        enabled: false
      },
      data: networkReadTimeSeries
    },
    {
      name: 'Network Write',
      color: '#E11D48',
      marker: {
        enabled: false
      },
      data: networkWriteTimeSeries
    }
  ];

  return chartOptions;
};

const useNetworkIODetails = () => {
  const sessionData = useSelector(getSessionMetrics);

  const [networkIOChartOptions, setDiskIOChartOptions] = useState(null);

  useEffect(() => {
    setDiskIOChartOptions(generateDiskIOChartOptions(sessionData));
  }, [sessionData]);

  return { networkIOChartOptions };
};

export default useNetworkIODetails;
