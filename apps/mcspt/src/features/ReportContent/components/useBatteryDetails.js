import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getDefaultChartOptions } from '../../../utils';
import {
  getLatestVideoCurrentTimeInSeconds,
  getSessionMetrics,
  useMcpChart
} from '../../Report';

const generateBatteryChartOptions = (sessionData, chartGridClicked) => {
  const chartOptions = getDefaultChartOptions();

  const batteryTimeSeriesData = sessionData?.report?.[
    'Application Battery'
  ]?.metrics?.map((x) => [x.ts / 1000, x.batterymAh]);

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
  const latestVideoCurrentTimeInSeconds = useSelector(
    getLatestVideoCurrentTimeInSeconds
  );

  const { chartGridClicked } = useMcpChart();

  const [batteryChartOptions, setBatteryChartOptions] = useState(null);

  useEffect(() => {
    setBatteryChartOptions(
      generateBatteryChartOptions(sessionData, chartGridClicked)
    );
  }, [sessionData, chartGridClicked]);

  useEffect(() => {
    setBatteryChartOptions((prevOps) => {
      const newOps = { ...prevOps };

      newOps.xAxis.plotLines[0].value = latestVideoCurrentTimeInSeconds;

      return newOps;
    });
  }, [latestVideoCurrentTimeInSeconds]);

  return { sessionData, batteryChartOptions };
};

export default useBatteryDetails;
