import { useSelector } from 'react-redux';

import { getTestMetaData } from '../../slices/selector';

export default function useOverview() {
  const testMetaData = useSelector(getTestMetaData);
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

  return {
    actionType,
    testMetaData,
    eventName,
    urlColumns,
    componentColumns,
    categoryColumns,
    onRowClick
  };
}
