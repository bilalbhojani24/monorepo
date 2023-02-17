import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getDefaultChartOptions } from '../../../utils';
import { getSessionMetrics } from '../../Report';

const generateDiskIOChartOptions = (sessionData) => {
  const chartOptions = getDefaultChartOptions();

  const diskReadTimeSeries = sessionData?.report?.['Disk IO']?.metrics?.map(
    (x) => [x.ts / 1000, x.diskReadKb]
  );

  const diskWriteTimeSeries = sessionData?.report?.['Disk IO']?.metrics?.map(
    (x) => [x.ts / 1000, x.diskWriteKb]
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
      name: 'Disk Read',
      color: '#65A30D',
      marker: {
        enabled: false
      },
      data: diskReadTimeSeries
    },
    {
      name: 'Disk Write',
      color: '#E11D48',
      marker: {
        enabled: false
      },
      data: diskWriteTimeSeries
    }
  ];

  return chartOptions;
};

const useDiskIODetails = () => {
  const sessionData = useSelector(getSessionMetrics);

  const [diskIOChartOptions, setDiskIOChartOptions] = useState(null);

  useEffect(() => {
    setDiskIOChartOptions(generateDiskIOChartOptions(sessionData));
  }, [sessionData]);

  return { diskIOChartOptions };
};

export default useDiskIODetails;
