import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDefaultChartOptions } from '@browserstack/mcp-shared';

import { getCPURealtimeData } from '../slices/realtimeMetricSlice';

const generateRealtimeCPUChartOptions = (
  cpuTimeSeriesData,
  chartGridClicked
) => {
  const chartOptions = getDefaultChartOptions();

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

  chartOptions.xAxis.plotLines = [];

  chartOptions.series = [
    {
      name: 'CPU Usage Percentage',
      color: '#4285F4',
      marker: {
        enabled: false
      },
      data: cpuTimeSeriesData
    }
  ];

  return chartOptions;
};

const useCPURealtimeGraph = () => {
  const cpuTimeSeriesData = useSelector(getCPURealtimeData);

  const [realtimeCpuChartOptions, setRealtimeCpuChartOptions] = useState(null);

  useEffect(() => {
    setRealtimeCpuChartOptions(generateRealtimeCPUChartOptions([], () => {}));
  }, []);

  useEffect(() => {
    setRealtimeCpuChartOptions((prevChartData) => {
      const oldData = { ...prevChartData };

      oldData.series[0].data = [...cpuTimeSeriesData];

      return oldData;
    });
  }, [cpuTimeSeriesData]);

  return { cpuTimeSeriesData, realtimeCpuChartOptions };
};

export default useCPURealtimeGraph;
