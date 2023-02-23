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

import {
  ACTIVE_TEST_RUNS_COLOR,
  TEST_CASES_TYPES_COLORS
} from '../const/immutableConst';
import { setIsLoadingProps } from '../slices/dashboardSlice';

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

  const isLoadingStates = useSelector((state) => state.dashboard.isLoading);

  const projectIdCheck = (key, apiFunction, doAfter) => {
    if (projectId === 'new') {
      dispatch(setIsLoadingProps({ key, value: false }));
      doAfter?.({
        empty_data: true
      });
    } else {
      dispatch(setIsLoadingProps({ key, value: true }));
      apiFunction(projectId).then((res) => {
        doAfter?.(res);
        dispatch(setIsLoadingProps({ key, value: false }));
      });
    }
  };

  const fetchActiveTestRuns = () => {
    projectIdCheck('activeTR', getActiveTestRunsAPI, (res) => {
      setActiveTestRunsOptions(
        donutOptionCreator({
          chartData: res?.data?.map((item) => [item.name, item.y]) || [],
          colors: ACTIVE_TEST_RUNS_COLOR,
          addOns: {
            isEmpty: res?.empty_data,
            total: res?.data?.reduce((total, item) => item.y + total, 0) || 0
          }
        })
      );
    });
  };

  const fetchClosedTestRunsMonthly = () => {
    projectIdCheck('closedTRMonthly', getClosedTestRunsMonthlyAPI, (res) => {
      setClosedTestRunsMonthlyLineOptions(
        lineOptionsCreator({
          chartData: [
            {
              name: '',
              data: res?.empty_data
                ? []
                : res?.data?.map((item) => item?.[1] || 0)
            }
          ],
          xAxis: res?.data?.map((item) => item?.[0]) || [],
          addOns: {
            isEmpty: res?.empty_data
          }
        })
      );
    });
  };

  const fetchClosedTestRunsDaily = () => {
    projectIdCheck('closedTRDaily', getClosedTestRunsDailyAPI, (res) => {
      setClosedTestRunsDailyLineOptions(
        stackedBarOptionsCreator({
          showLegend: true,
          xAxis: res?.date_list,
          chartData: res?.empty_data
            ? []
            : res?.data?.map((item, index) => ({
                ...item,
                color: ACTIVE_TEST_RUNS_COLOR[index]
              })),
          addOns: {
            isEmpty: res?.empty_data
          }
        })
      );
    });
  };

  const fetchTestCaseTypeSplit = () => {
    projectIdCheck('typeOfTC', getTestCaseTypeSplitAPI, (res) => {
      setTestCaseTypesOptions(
        donutOptionCreator({
          chartData: res?.data?.map((item) => [item.name, item.y]) || [],
          colors: TEST_CASES_TYPES_COLORS,
          addOns: {
            isEmpty: res?.empty_data,
            total: res?.data?.reduce((total, item) => item.y + total, 0) || 0
          }
        })
      );
    });
  };

  const fetchTrendOfTestCases = () => {
    projectIdCheck('trendOfTC', getTestCaseCountTrendAPI, (res) => {
      setTestCasesTrendOptions(
        lineOptionsCreator({
          showLegend: res ? !res?.empty_data : false,
          chartData: res?.empty_data
            ? []
            : Object.keys(res?.data).map((item, index) => ({
                color: ACTIVE_TEST_RUNS_COLOR[index],
                name: item,
                data: res?.data[item] ? Object.values(res?.data[item]) : []
              })),
          xAxis: res?.data
            ? Object.keys(Object.entries(res?.data)?.[0]?.[1])
            : [],
          addOns: {
            isEmpty: res ? res?.empty_data : true
          }
        })
      );
    });
  };

  const fetchJiraIssues = () => {
    projectIdCheck('jiraIssues', getIssuesCountAPI, (res) => {
      setJiraIssuesOptions(
        barOptionsCreator({
          xAxis: res?.data?.map((item) => item?.[0] || '') || [],
          chartData: [
            {
              name: 'Issues',
              data: res?.empty_data
                ? []
                : res?.data?.map((item) => item?.[1] || 0)
            }
          ],
          addOns: {
            isEmpty: res?.empty_data
          }
        })
      );
    });
  };

  const fetchAllChartData = () => {
    fetchActiveTestRuns(); // Active test runs - pie
    fetchClosedTestRunsMonthly(); // Closed Test Runs Monthly- line
    fetchClosedTestRunsDaily(); // Closed Test Runs Daily - stacked
    fetchTestCaseTypeSplit(); // Type of test cases - pie
    fetchTrendOfTestCases(); // Trend of Test Cases - muli line
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
    isLoadingStates,
    fetchAllChartData
  };
}
