import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDefaultChartOptions } from 'utils/chartUtils';

import {
  getLatestVideoCurrentTimeInSeconds,
  getSessionMetrics,
  useMcpChart
} from 'features/Report';

const generateDiskIOChartOptions = (sessionData, chartGridClicked) => {
  const chartOptions = getDefaultChartOptions();

  const diskReadTimeSeries = sessionData?.report?.['Disk IO']?.metrics?.map(
    (x) => [x.ts / 1000, x.diskReadKb]
  );

  const diskWriteTimeSeries = sessionData?.report?.['Disk IO']?.metrics?.map(
    (x) => [x.ts / 1000, x.diskWriteKb]
  );

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
  const latestVideoCurrentTimeInSeconds = useSelector(
    getLatestVideoCurrentTimeInSeconds
  );

  const { chartGridClicked } = useMcpChart();

  const [diskIOChartOptions, setDiskIOChartOptions] = useState(null);

  useEffect(() => {
    setDiskIOChartOptions(
      generateDiskIOChartOptions(sessionData, chartGridClicked)
    );
  }, [sessionData, chartGridClicked]);

  useEffect(() => {
    setDiskIOChartOptions((prevOps) => {
      const newOps = { ...prevOps };

      newOps.xAxis.plotLines[0].value = latestVideoCurrentTimeInSeconds;

      return newOps;
    });
  }, [latestVideoCurrentTimeInSeconds]);

  return { sessionData, diskIOChartOptions };
};

export default useDiskIODetails;
