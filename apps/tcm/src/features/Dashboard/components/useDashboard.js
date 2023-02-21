import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getActiveTestRunsAPI,
  getClosedTestRunsDailyAPI,
  getClosedTestRunsMonthlyAPI,
  getIssuesCountAPI,
  getTestCaseCountTrendAPI,
  getTestCaseTypeSplitAPI
} from 'api/dashboard.api';
import { setSelectedProject } from 'globalSlice';

// import { setActiveTestRuns } from '../slices/dashboardSlice';
import {
  ACTIVE_TEST_RUNS_COLOR,
  TEST_CASES_TYPES_COLORS
} from '../const/immutableConst';

import {
  barOptionsCreator,
  donutOptionCreator,
  lineOptionsCreator,
  stackedBarOptionsCreator
} from './chartHelpers';

export default function useDashboard() {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const [activeTestRunsOptions, setActiveTestRunsOptions] = useState(null);
  const [testCaseTypesOptions, setTestCaseTypesOptions] = useState(null);
  const [testCasesTrendOptions, setTestCasesTrendOptions] = useState(null);
  const [
    closedTestRunsMonthlyLineOptions,
    setClosedTestRunsMonthlyLineOptions
  ] = useState(null);
  const [closedTestRunsDailyLineOptions, setClosedTestRunsDailyLineOptions] =
    useState(null);
  const [jiraIssuesOptions, setJiraIssuesOptions] = useState(null);

  const activeTestRuns = useSelector((state) => state.dashboard.activeTestRuns);

  const fetchActiveTestRuns = () => {
    getActiveTestRunsAPI(projectId).then((res) => {
      setActiveTestRunsOptions(
        donutOptionCreator({
          chartData: res.data.map((item) => [item.name, item.y]),
          colors: ACTIVE_TEST_RUNS_COLOR,
          addOns: {
            isEmpty: res?.empty_data,
            total: res.data.reduce((total, item) => item.y + total, 0)
          }
        })
      );
    });
  };

  const fetchClosedTestRunsMonthly = () => {
    getClosedTestRunsMonthlyAPI(projectId).then((res) => {
      if (!res.empty_data) {
        setClosedTestRunsMonthlyLineOptions(
          lineOptionsCreator({
            chartData: [
              {
                name: '',
                data: res.data.map((item) => item?.[1] || 0)
              }
            ],
            xAxis: res.data.map((item) => item?.[0])
          })
        );
      }
    });
  };

  const fetchClosedTestRunsDaily = () => {
    getClosedTestRunsDailyAPI(projectId).then((res) => {
      if (!res.empty_data) {
        setClosedTestRunsDailyLineOptions(
          stackedBarOptionsCreator({
            showLegend: true,
            xAxis: res.date_list,
            chartData: res?.data
          })
        );
      }
    });
  };

  const fetchTestCaseTypeSplit = () => {
    getTestCaseTypeSplitAPI(projectId).then((res) => {
      setTestCaseTypesOptions(
        donutOptionCreator({
          chartData: res.data.map((item) => [item.name, item.y]),
          colors: TEST_CASES_TYPES_COLORS,
          addOns: {
            isEmpty: res?.empty_data,
            total: res.data.reduce((total, item) => item.y + total, 0)
          }
        })
      );
    });
  };

  const fetchTrendOfTestCases = () => {
    getTestCaseCountTrendAPI(projectId).then((res) => {
      if (!res.empty_data) {
        setTestCasesTrendOptions(
          lineOptionsCreator({
            showLegend: true,
            chartData: [
              {
                name: '',
                data: res.data.map((item) => item?.[1] || 0)
              }
            ],
            xAxis: res.data.map((item) => item?.[0])
          })
        );
      }
    });
  };
  const fetchJiraIssues = () => {
    getIssuesCountAPI(projectId).then((res) => {
      if (!res.empty_data) {
        setJiraIssuesOptions(
          barOptionsCreator({
            xAxis: res.data.map((item) => item?.[0] || ''),
            chartData: [
              {
                name: 'Issues',
                data: res.data.map((item) => item?.[1] || 0)
              }
            ]
          })
        );
      }
    });
  };

  const fetchAllChartData = () => {
    fetchActiveTestRuns(); // Active test runs - pie
    fetchClosedTestRunsMonthly(); // Closed Test Runs Monthly- line
    fetchClosedTestRunsDaily(); // Closed Test Runs Daily - stacked
    fetchTestCaseTypeSplit(); // Type of test cases - pie
    // fetchTrendOfTestCases(); // Trend of Test Cases - muli line
    fetchJiraIssues(); // JIRA Issues (Last 12 Months) - bar
  };

  useEffect(() => {
    dispatch(setSelectedProject(projectId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  return {
    testCaseTypesOptions,
    closedTestRunsDailyLineOptions,
    jiraIssuesOptions,
    activeTestRunsOptions,
    closedTestRunsMonthlyLineOptions,
    testCasesTrendOptions,
    projectId,
    activeTestRuns,
    fetchAllChartData
  };
}
