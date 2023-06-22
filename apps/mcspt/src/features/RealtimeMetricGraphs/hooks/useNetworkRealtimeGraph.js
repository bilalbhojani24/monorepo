import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDefaultRealtimeChartOptions } from '@browserstack/mcp-shared';

import {
  getNetworkDownloadTimeSeriesData,
  getNetworkUploadTimeSeriesData
} from '../slices/realtimeMetricSlice';

const generateRealtimeNetworkChartOptions = (chartGridClicked) => {
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

  chartOptions.legend = {
    enabled: true,
    marginTop: 16,
    marginBottom: 0
  };

  chartOptions.series = [
    {
      name: 'Data Upload',
      color: '#65A30D',
      marker: {
        enabled: false
      },
      data: []
    },
    {
      name: 'Data Download',
      color: '#E11D48',
      marker: {
        enabled: false
      },
      data: []
    }
  ];

  return chartOptions;
};

const useNetworkRealtimeGraph = () => {
  const networkDownloadTimeSeriesData = useSelector(
    getNetworkDownloadTimeSeriesData
  );
  const networkUploadTimeSeriesData = useSelector(
    getNetworkUploadTimeSeriesData
  );

  const [realtimeNetworkChartOptions, setRealtimeNetworkChartOptions] =
    useState(null);

  useEffect(() => {
    setRealtimeNetworkChartOptions(
      generateRealtimeNetworkChartOptions(() => {})
    );
  }, []);

  useEffect(() => {
    setRealtimeNetworkChartOptions((prevChartData) => {
      const oldData = { ...prevChartData };
      oldData.series[0].data = [...networkUploadTimeSeriesData];
      return oldData;
    });
  }, [networkUploadTimeSeriesData]);

  useEffect(() => {
    setRealtimeNetworkChartOptions((prevChartData) => {
      const oldData = { ...prevChartData };
      oldData.series[1].data = [...networkDownloadTimeSeriesData];
      return oldData;
    });
  }, [networkDownloadTimeSeriesData]);

  return {
    networkUploadTimeSeriesData,
    networkDownloadTimeSeriesData,
    realtimeNetworkChartOptions
  };
};

export default useNetworkRealtimeGraph;
