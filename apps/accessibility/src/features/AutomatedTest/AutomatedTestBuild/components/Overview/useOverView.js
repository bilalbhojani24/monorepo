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

  const prepareDataForChart = () => {
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
      if (val.issueSummary) {
        Object.keys(dataPoints).forEach((key) => {
          dataPoints[key].push(val.issueSummary[key]);
        });
      }
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
    prepareDataForChart
  };
}
