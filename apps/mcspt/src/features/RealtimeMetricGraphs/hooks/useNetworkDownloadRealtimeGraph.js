import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDefaultRealtimeChartOptions } from '@browserstack/mcp-shared';

import { getNetworkDownloadTimeSeriesData } from '../slices/realtimeMetricSlice';

const generateRealtimeNetworkDownloadChartOptions = (chartGridClicked) => {
  const chartOptions = getDefaultRealtimeChartOptions();

  chartOptions.chart = {
    type: 'spline',
    height: 160,
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

  chartOptions.series = [
    {
      name: 'Network Download',
      color: '#4285F4',
      marker: {
        enabled: false
      },
      data: []
    }
  ];

  return chartOptions;
};

const useNetworkDownloadRealtimeGraph = () => {
  const networkDownloadTimeSeriesData = useSelector(
    getNetworkDownloadTimeSeriesData
  );

  const [
    realtimeNetworkDownloadChartOptions,
    setRealtimeNetworkDownloadChartOptions
  ] = useState(null);

  useEffect(() => {
    setRealtimeNetworkDownloadChartOptions(
      generateRealtimeNetworkDownloadChartOptions(() => {})
    );
  }, []);

  useEffect(() => {
    setRealtimeNetworkDownloadChartOptions((prevChartData) => {
      const oldData = { ...prevChartData };
      oldData.series[0].data = [...networkDownloadTimeSeriesData];
      return oldData;
    });
  }, [networkDownloadTimeSeriesData]);

  return {
    networkDownloadTimeSeriesData,
    realtimeNetworkDownloadChartOptions
  };
};

export default useNetworkDownloadRealtimeGraph;
