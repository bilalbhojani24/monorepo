import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getLatestVideoCurrentTimeInSeconds,
  getSessionMetrics,
  useMcpChart
} from 'features/Report';
import { getDefaultChartOptions } from 'utils/chartUtils';

const generateNetworkIOChartOptions = (sessionData, chartGridClicked) => {
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
  const latestVideoCurrentTimeInSeconds = useSelector(
    getLatestVideoCurrentTimeInSeconds
  );

  const { chartGridClicked } = useMcpChart();

  const [networkIOChartOptions, setNetworkIOChartOptions] = useState(null);

  useEffect(() => {
    setNetworkIOChartOptions(
      generateNetworkIOChartOptions(
        sessionData,
        chartGridClicked('networkIoChart', sessionData)
      )
    );
  }, [sessionData, chartGridClicked]);

  useEffect(() => {
    setNetworkIOChartOptions((prevOps) => {
      const newOps = { ...prevOps };

      newOps.xAxis.plotLines[0].value = latestVideoCurrentTimeInSeconds;

      return newOps;
    });
  }, [latestVideoCurrentTimeInSeconds]);

  return { sessionData, networkIOChartOptions };
};

export default useNetworkIODetails;
