import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  resetFilters,
  setBuildFiltersKey,
  setShowHiddenIssues
} from 'features/AutomatedTest/AutomatedTestBuild/slices/appSlice';
import { updateUrlWithQueryParam } from 'utils/helper';

import { getBuildMetaData } from '../../slices/selector';

export default function useOverview() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const buildMetaData = useSelector(getBuildMetaData);
  const ISSUE_COUNT = 'Issue Count';
  const { critical, serious, moderate, minor, issueCount } =
    buildMetaData.issueSummary;
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
      label: 'Critical',
      name: 'Critical',
      y: critical,
      color: '#F95D6A',
      selected: true,
      value: 'critical'
    },
    {
      label: 'Serious',
      name: 'Serious',
      y: serious,
      color: '#F472B6',
      value: 'serious'
    },
    {
      label: 'Moderate',
      name: 'Moderate',
      y: moderate,
      color: '#FBBF24',
      value: 'moderate'
    },
    {
      label: 'Minor',
      name: 'Minor',
      y: minor,
      color: '#9CA3AF',
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

  const onRowClick = (filter, value, shouldShowNeedsReviewIssues = false) => {
    const values = shouldShowNeedsReviewIssues || [value];
    dispatch(resetFilters());
    dispatch(setShowHiddenIssues({ hideIssues: false }));
    dispatch(setBuildFiltersKey({ key: filter, values }));

    // append filter to url as query param
    let val = value;
    if (filter !== 'showNeedsReviewIssues') {
      val = value.value;
    }
    const path = updateUrlWithQueryParam({ [filter]: val });
    navigate(`?${path}`);
    document.querySelector('button[value="All issues"]').click();
  };

  const prepareDataForIssueTrendChart = () => {
    const dataPoints = {};
    const categories = [];
    const colors = {
      minor: '#9CA3AF',
      moderate: '#FBBF24',
      serious: ' #F472B6',
      critical: '#F95D6A'
    };
    const series = Object.keys(buildMetaData?.trendData[0]?.issueSummary || {});
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
      skipped: '#F59E0B'
    };
    const excludeSeries = ['total'];

    const series = Object.keys(
      buildMetaData?.trendData[0]?.healthSummary || {}
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
    issueSummaryData,
    healthSummaryData,
    actionType,
    buildMetaData,
    eventName,
    urlColumns,
    componentColumns,
    categoryColumns,
    issueCount,
    onRowClick,
    prepareDataForIssueTrendChart,
    prepareDataForHealthHistoryChart
  };
}
