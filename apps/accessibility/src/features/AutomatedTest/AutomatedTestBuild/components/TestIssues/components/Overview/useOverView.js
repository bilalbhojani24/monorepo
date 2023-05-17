import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  resetFilters,
  resetIssueItem,
  setShowHiddenIssues,
  setTestFiltersKey
} from 'features/AutomatedTest/AutomatedTestBuild/components/TestIssues/slices/appSlice';
import {
  getTestData,
  getTestMetaData
} from 'features/AutomatedTest/AutomatedTestBuild/components/TestIssues/slices/selector';
import { getHiddenIssuesCount, updateUrlWithQueryParam } from 'utils/helper';

export default function useOverview() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const testMetaData = useSelector(getTestMetaData);
  const testData = useSelector(getTestData);

  const { hiddenIssues, needsReviewIssues } = getHiddenIssuesCount(testData);

  const { critical, serious, moderate, minor } = testMetaData.issueSummary;
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
  const actionType = '';
  const eventName = 'Sample event name...';

  const onRowClick = (filter, value, shouldShowNeedsReviewIssues = false) => {
    const values = shouldShowNeedsReviewIssues || [value];
    dispatch(resetFilters());
    dispatch(setShowHiddenIssues({ hideIssues: false }));
    dispatch(setTestFiltersKey({ key: filter, values }));

    // append filter to url as query param
    const path = updateUrlWithQueryParam({ [filter]: value });
    navigate(`?${path}`);
    document.querySelector('button[value="Overview"]').click();
  };

  const onHiddenIssueClick = () => {
    dispatch(setShowHiddenIssues({ hideIssues: true }));
    dispatch(resetFilters());
    dispatch(resetIssueItem());
    const path = updateUrlWithQueryParam({ hideIssues: true });
    navigate(`?${path}`);
    document.querySelector('button[value="All issues"]').click();
  };

  return {
    actionType,
    issueSummaryData,
    hiddenIssues,
    needsReviewIssues,
    testMetaData,
    eventName,
    urlColumns,
    componentColumns,
    categoryColumns,
    onHiddenIssueClick,
    onRowClick
  };
}
