import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDefaultRealtimeChartOptions } from '@browserstack/mcp-shared';

import { getNetworkUploadTimeSeriesData } from '../slices/realtimeMetricSlice';

const generateRealtimeNetworkUploadChartOptions = (chartGridClicked) => {
  const chartOptions = getDefaultRealtimeChartOptions();

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

  chartOptions.series = [
    {
      name: 'NetworkUpload Usage Percentage',
      color: '#4285F4',
      marker: {
        enabled: false
      },
      data: []
    }
  ];

  return chartOptions;
};

const useNetworkUploadRealtimeGraph = () => {
  const networkUploadTimeSeriesData = useSelector(
    getNetworkUploadTimeSeriesData
  );

  const [
    realtimeNetworkUploadChartOptions,
    setRealtimeNetworkUploadChartOptions
  ] = useState(null);

  useEffect(() => {
    setRealtimeNetworkUploadChartOptions(
      generateRealtimeNetworkUploadChartOptions(() => {})
    );
  }, []);

  useEffect(() => {
    setRealtimeNetworkUploadChartOptions((prevChartData) => {
      const oldData = { ...prevChartData };
      oldData.series[0].data = [...networkUploadTimeSeriesData];
      return oldData;
    });
  }, [networkUploadTimeSeriesData]);

  return {
    networkUploadTimeSeriesData,
    realtimeNetworkUploadChartOptions
  };
};

export default useNetworkUploadRealtimeGraph;
