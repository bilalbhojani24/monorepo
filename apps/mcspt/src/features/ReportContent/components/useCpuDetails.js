import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getLatestVideoCurrentTimeInSeconds,
  getSessionMetrics,
  useMcpChart
} from 'features/Report';
import { getDefaultChartOptions } from 'utils/chartUtils';

const generateCPUChartOptions = (sessionData, chartGridClicked) => {
  const chartOptions = getDefaultChartOptions();

  const cpuTimeSeriesData = sessionData?.report?.CPU?.metrics?.map((x) => [
    x.ts / 1000,
    x.cpuUsagePercentage
  ]);

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
  const latestVideoCurrentTimeInSeconds = useSelector(
    getLatestVideoCurrentTimeInSeconds
  );

  const { chartGridClicked } = useMcpChart();

  const [cpuChartOptions, setCpuChartOptions] = useState(null);

  useEffect(() => {
    setCpuChartOptions(
      generateCPUChartOptions(
        sessionData,
        chartGridClicked('cpuChart', sessionData)
      )
    );
  }, [sessionData, chartGridClicked]);

  useEffect(() => {
    setCpuChartOptions((prevOps) => {
      const newOps = { ...prevOps };

      newOps.xAxis.plotLines[0].value = latestVideoCurrentTimeInSeconds;

      return newOps;
    });
  }, [latestVideoCurrentTimeInSeconds]);

  return { sessionData, cpuChartOptions };
};

export default useCpuDetails;
