import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getDefaultReportChartOptions } from '../../../utils/chartUtils';
import {
  getLatestVideoCurrentTimeInSeconds,
  getSessionMetrics,
  useMcpChart
} from '../../Report';

const generateMemoryChartOptions = (sessionData, chartGridClicked) => {
  const chartOptions = getDefaultReportChartOptions();

  const memoryTimeSeriesData = sessionData?.report?.Memory?.metrics?.map(
    (x) => [x.ts / 1000, x.memoryMB]
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
    ...chartOptions.plotOptions,
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
      name: 'Memory',
      color: '#4F46E5',
      marker: {
        enabled: false
      },
      data: memoryTimeSeriesData
    }
  ];

  return chartOptions;
};

const useMemoryDetails = () => {
  const sessionData = useSelector(getSessionMetrics);
  const latestVideoCurrentTimeInSeconds = useSelector(
    getLatestVideoCurrentTimeInSeconds
  );

  const { chartGridClicked } = useMcpChart();

  const [memoryChartOptions, setMemoryChartOptions] = useState(null);

  useEffect(() => {
    setMemoryChartOptions(
      generateMemoryChartOptions(
        sessionData,
        chartGridClicked('memoryChart', sessionData)
      )
    );
  }, [sessionData, chartGridClicked]);

  useEffect(() => {
    setMemoryChartOptions((prevOps) => {
      const newOps = { ...prevOps };

      newOps.xAxis.plotLines[0].value = latestVideoCurrentTimeInSeconds;

      return newOps;
    });
  }, [latestVideoCurrentTimeInSeconds]);

  return { sessionData, memoryChartOptions };
};

export default useMemoryDetails;
