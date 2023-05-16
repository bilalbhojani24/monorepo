import { useSelector } from 'react-redux';

import { getBuildMetaData } from '../../slices/selector';

export default function useOverview() {
  const buildMetaData = useSelector(getBuildMetaData);
  const ISSUE_COUNT = 'Issue Count';
  const componentColumns = [
    {
      id: 'index',
      name: '#',
      key: 'index'
    },
    {
      id: 'affectedComponents',
      name: 'Top Affected Components',
      key: 'affectedComponents'
    },
    {
      id: 'issueCount',
      name: ISSUE_COUNT,
      key: 'issueCount'
    }
  ];

  const urlColumns = [
    {
      id: 'index',
      name: '#',
      key: 'index'
    },
    {
      id: 'affectedUrls',
      name: 'Top Affected URLs',
      key: 'affectedUrls'
    },
    {
      id: 'issueCount',
      name: ISSUE_COUNT,
      key: 'issueCount'
    }
  ];

  const categoryColumns = [
    {
      id: 'index',
      name: '#',
      key: 'index'
    },
    {
      id: 'category',
      name: 'Category',
      key: 'category'
    },
    {
      id: 'issueCount',
      name: ISSUE_COUNT,
      key: 'issueCount'
    }
  ];
  const actionType = '';
  const eventName = 'Sample event name...';

  const onRowClick = (key, option) => {
    console.log('key, option: ', option, key);
  };

  const prepareDataForIssueTrendChart = () => {
    const dataPoints = {};
    const categories = [];
    const colors = {
      minor: '#9CA3AF',
      moderate: '#EAB308',
      serious: ' #F97316',
      critical: '#EF4444'
    };
    const series = Object.keys(buildMetaData?.trendData[0].issueSummary);
    series.forEach((val) => {
      dataPoints[val] = [];
    });

    buildMetaData?.trendData.forEach((val) => {
      Object.keys(dataPoints).forEach((key) => {
        dataPoints[key].push(val.issueSummary[key]);
      });
      categories.push(`#${val.buildNumber}`);
    });

    return { dataPoints, categories, series, colors };
  };

  const prepareDataForHealthHistoryChart = () => {
    const dataPoints = {};
    const categories = [];
    const colors = {
      passed: '#53CA95',
      failed: '#FC5F6C',
      skipped: '#FBBF24'
    };
    const excludeSeries = ['total'];

    const series = Object.keys(
      buildMetaData?.trendData[0].healthSummary
    ).filter((val) => !excludeSeries.includes(val));
    series.forEach((val) => {
      dataPoints[val] = [];
    });

    buildMetaData?.trendData.forEach((val) => {
      Object.keys(dataPoints).forEach((key) => {
        dataPoints[key].push(val.healthSummary[key]);
      });
      categories.push(`#${val.buildNumber}`);
    });

    return { dataPoints, categories, series, colors };
  };

  return {
    actionType,
    buildMetaData,
    eventName,
    urlColumns,
    componentColumns,
    categoryColumns,
    onRowClick,
    prepareDataForIssueTrendChart,
    prepareDataForHealthHistoryChart
  };
}
