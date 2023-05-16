import { useSelector } from 'react-redux';

import { getBuildMetaData } from '../../slices/selector';

export default function useOverview() {
  const buildMetaData = useSelector(getBuildMetaData);
  const ISSUE_COUNT = 'Issue Count';
  const { critical, serious, moderate, minor } = buildMetaData.issueSummary;
  const { passed, failed, skipped } = buildMetaData.healthSummary;
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

  const issueSummaryData = [
    {
      name: 'Critical',
      y: critical,
      color: '#F95D6A',
      selected: true,
      value: 'critical'
    },
    {
      name: 'Serious',
      y: serious,
      color: '#F472B6',
      value: 'serious'
    },
    {
      name: 'Moderate',
      y: moderate,
      color: '#E3C500',
      value: 'moderate'
    },
    {
      name: 'Minor',
      y: minor,
      color: '#C5D1D8',
      value: 'minor'
    }
  ];

  const healthSummaryData = [
    {
      name: 'Passed',
      y: passed,
      color: '#53CA95',
      selected: true,
      value: 'passed'
    },
    {
      name: 'Failed',
      y: failed,
      color: '#FC5F6C',
      value: 'failed'
    },
    {
      name: 'Skipped',
      y: skipped,
      color: '#F59E0B',
      value: 'skipped'
    }
  ];

  const actionType = '';
  const eventName = 'Sample event name...';

  const onRowClick = (key, option) => {
    console.log('key, option: ', option, key);
  };

  return {
    issueSummaryData,
    healthSummaryData,
    actionType,
    buildMetaData,
    eventName,
    urlColumns,
    componentColumns,
    categoryColumns,
    onRowClick
  };
}
