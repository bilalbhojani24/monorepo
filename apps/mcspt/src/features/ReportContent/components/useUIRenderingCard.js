import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDefaultChartOptions } from 'utils/chartUtils';

import {
  getLatestVideoCurrentTimeInSeconds,
  getSessionMetrics,
  useMcpChart
} from '../../Report';

const generateFrameChartOptions = (sessionData, chartGridClicked) => {
  const chartOptions = getDefaultChartOptions();

  const fpsSeries = sessionData?.report?.Frames?.metrics?.map((x) => [
    x.ts / 1000,
    x.fps
  ]);

  const jankySeries = sessionData?.report?.Frames?.metrics?.map((x) => [
    x.ts / 1000,
    x.jankyFps
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
      name: 'FPS',
      color: '#0284C7',
      marker: {
        enabled: false
      },
      data: fpsSeries
    },
    {
      name: 'Slow Frames/Second',
      color: '#C026D3',
      marker: {
        enabled: false
      },
      data: jankySeries
    }
  ];

  return chartOptions;
};

const useUIRenderingCard = () => {
  const sessionData = useSelector(getSessionMetrics);
  const latestVideoCurrentTimeInSeconds = useSelector(
    getLatestVideoCurrentTimeInSeconds
  );

  const { chartGridClicked } = useMcpChart();

  const [frameChartOptions, setFrameChartOptions] = useState(null);

  useEffect(() => {
    setFrameChartOptions(
      generateFrameChartOptions(sessionData, chartGridClicked)
    );
  }, [chartGridClicked, sessionData]);

  useEffect(() => {
    setFrameChartOptions((prevOps) => {
      const newOps = { ...prevOps };

      newOps.xAxis.plotLines[0].value = latestVideoCurrentTimeInSeconds;

      return newOps;
    });
  }, [latestVideoCurrentTimeInSeconds]);

  return { sessionData, frameChartOptions };
};

export default useUIRenderingCard;
