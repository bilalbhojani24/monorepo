import { useEffect, useState } from 'react';

import { chartOptionsSpline, chartOptionStacked } from './chartOptions';

export default function useOverview({ scanOverviewData }) {
  const [stackedChartData, setStackedChartData] = useState(chartOptionStacked);
  const [splineChartOptions, setSplineChartOptions] =
    useState(chartOptionsSpline);
  const [currentRunFilter, setRunFilter] = useState(4);
  const [currentSplineRunFilter, setSplineRunFilter] = useState(4);
  const [splineChartData, setSplineChartData] = useState(chartOptionsSpline);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (scanOverviewData?.data?.overview?.issueHistory) {
      const severity = {
        minor: [],
        critical: [],
        severe: [],
        moderate: []
      };

      const categories = [];
      for (let i = 0; i < currentRunFilter; i += 1) {
        const item = scanOverviewData?.data?.overview?.issueHistory[i];
        if (item) {
          severity.minor.push(item.minor);
          severity.critical.push(item.critical);
          severity.severe.push(item.severe);
          severity.moderate.push(item.moderate);
        }
        categories.push(i + 1);
      }
      const currentStackedChartData = { ...stackedChartData };
      console.log(categories);
      currentStackedChartData.xAxis.categories = categories;
      currentStackedChartData.xAxis.max = currentRunFilter - 1;
      currentStackedChartData.series = [
        {
          name: 'Minor',
          data: severity.minor,
          borderWidth: 0,
          color: '#DFE7E8',
          pointWidth: 12,
          borderRadiusTopLeft: '10px',
          borderRadiusTopRight: '10px'
        },
        {
          name: 'Moderate',
          data: severity.moderate,
          borderWidth: 0,
          color: '#EAB308',
          pointWidth: 12
        },
        {
          name: 'Severe',
          data: severity.severe,
          borderWidth: 0,
          color: '#F97316',
          pointWidth: 12
        },
        {
          name: 'Critical',
          data: severity.critical,
          color: '#DC2626',
          pointWidth: 12,
          borderWidth: 0
        }
      ];
      setStackedChartData(currentStackedChartData);
    }
    if (scanOverviewData?.data?.overview?.scanStability) {
      const stability = {
        redirects: [],
        success: [],
        failure: []
      };

      const categories = [];
      for (let i = 0; i < currentSplineRunFilter; i += 1) {
        const item = scanOverviewData.data.overview.scanStability[i];
        if (item) {
          stability.redirects.push(item.redirects);
          stability.failure.push(item.failure);
          stability.success.push(item.success);
        }
        categories.push(i + 1);
      }
      const currentSplineChartData = { ...splineChartData };
      currentSplineChartData.xAxis.categories = categories;
      currentSplineChartData.xAxis.max = currentSplineRunFilter;
      currentSplineChartData.series = [
        {
          name: 'Success',
          data: stability.success,
          color: '#22C55E'
        },
        {
          name: 'Failure',
          data: stability.failure,
          color: '#EF4444'
        },
        {
          name: 'Redirects',
          data: stability.redirects,
          color: '#F59E0B'
        }
      ];
      setSplineChartOptions(currentSplineChartData);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scanOverviewData, currentRunFilter, currentSplineRunFilter]);

  const handleStackedFilter = (e) => {
    const runFilterVal = e.value;
    setRunFilter(runFilterVal);
  };

  const handleSplineFilter = (e) => {
    const runFilterVal = e.value;
    setSplineRunFilter(runFilterVal);
  };

  return {
    stackedChartData,
    setStackedChartData,
    setSplineChartData,
    splineChartData,
    handleStackedFilter,
    currentRunFilter,
    splineChartOptions,
    handleSplineFilter,
    currentSplineRunFilter,
    isCopied,
    setIsCopied
  };
}
