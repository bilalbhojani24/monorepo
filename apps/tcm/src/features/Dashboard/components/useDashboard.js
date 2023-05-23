import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getActiveTestRunsAPI,
  getClosedTestRunsDailyAPI,
  getClosedTestRunsMonthlyAPI,
  getIssuesCountAPI,
  getTestCaseCountTrendAPI,
  getTestCaseTypeSplitAPI
} from 'api/dashboard.api';
import { setSelectedProject } from 'globalSlice';
import { logEventHelper } from 'utils/logEvent';

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
  const navigate = useNavigate();
  const scrollWrapElement = useRef();
  const [isAllDashboadEmpty, setAllDashboadEmpty] = useState(false);
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
  const currentProjectName = useSelector(
    (state) => state.projects.currentSelectedProjectName
  );
  useEffect(() => {
    if (
      activeTestRunsOptions?.isEmpty &&
      testCaseTypesOptions?.isEmpty &&
      testCasesTrendOptions?.isEmpty &&
      closedTestRunsMonthlyLineOptions?.isEmpty &&
      closedTestRunsDailyLineOptions?.isEmpty &&
      jiraIssuesOptions?.isEmpty
    ) {
      setAllDashboadEmpty(true);
    } else setAllDashboadEmpty(false);
  }, [
    activeTestRunsOptions,
    testCaseTypesOptions,
    testCasesTrendOptions,
    closedTestRunsMonthlyLineOptions,
    closedTestRunsDailyLineOptions,
    jiraIssuesOptions
  ]);

  const projectIdCheck = (key, apiFunction, doAfter) => {
    if (projectId === 'new') {
      dispatch(setIsLoadingProps({ key, value: false }));
      doAfter?.({
        empty_data: true
      });
    } else {
      dispatch(setIsLoadingProps({ key, value: true }));
      apiFunction(projectId)
        .then((res) => {
          doAfter?.(res);
          dispatch(setIsLoadingProps({ key, value: false }));
        })
        .catch(() => {
          dispatch(setIsLoadingProps({ key, value: false }));
        });
    }
  };

  const fetchActiveTestRuns = () => {
    const formatPieChartData = (data) =>
      Object.keys(ACTIVE_TEST_RUNS_COLOR).map((item) => [
        item,
        data?.find((dataItem) => dataItem?.name === item)?.y || 0
      ]);

    projectIdCheck('activeTR', getActiveTestRunsAPI, (res) => {
      setActiveTestRunsOptions(
        donutOptionCreator({
          chartData: res?.empty_data ? [] : formatPieChartData(res?.data),
          colors: Object.values(ACTIVE_TEST_RUNS_COLOR),
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
    const formatBarChartData = (data) =>
      Object.keys(ACTIVE_TEST_RUNS_COLOR).map((item) => ({
        name: item,
        data: data?.find((dataItem) => dataItem?.name === item)?.data || [],
        color: ACTIVE_TEST_RUNS_COLOR[item]
      }));

    projectIdCheck('closedTRDaily', getClosedTestRunsDailyAPI, (res) => {
      setClosedTestRunsDailyLineOptions(
        stackedBarOptionsCreator({
          showLegend: true,
          xAxis: res?.date_list,
          chartData: res?.empty_data ? [] : formatBarChartData(res?.data),
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
          chartData: res?.empty_data
            ? []
            : res?.data?.map((item) => [item.name, item.y]) || [],
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
                color: TEST_CASES_TYPES_COLORS[index],
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

  const logTheEvent = (eventName) => {
    dispatch(
      logEventHelper(eventName, {
        project_id: projectId,
        project_name: currentProjectName
      })
    );
  };

  const onDVFooterClick = (e, eventName) => {
    e.preventDefault();
    e.stopPropagation();
    logTheEvent(eventName);
    if (e?.currentTarget?.getAttribute?.('href'))
      navigate(e.currentTarget.getAttribute('href'));
  };

  useEffect(() => {
    dispatch(setSelectedProject(projectId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  return {
    scrollWrapElement,
    isAllDashboadEmpty,
    testCaseTypesOptions,
    closedTestRunsDailyLineOptions,
    jiraIssuesOptions,
    activeTestRunsOptions,
    closedTestRunsMonthlyLineOptions,
    testCasesTrendOptions,
    projectId,
    isLoadingStates,
    fetchAllChartData,
    onDVFooterClick
  };
}
