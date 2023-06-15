import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MdInfoOutline } from '@browserstack/bifrost';
import classNames from 'classnames';
import {
  TMAlerts,
  TMDataVisualization,
  TMPageHeadings
} from 'common/bifrostProxy';
import AppRoute from 'const/routes';
import Highcharts from 'highcharts';
import variablePie from 'highcharts/modules/variable-pie';
import HighchartsReact from 'highcharts-react-official';
import { routeFormatter } from 'utils/helperFunctions';
import { logEventHelper } from 'utils/logEvent';

import { NO_DATA_TEXT } from '../const/immutableConst';

import useDashboard from './useDashboard';

variablePie(Highcharts);

const Dashboard = () => {
  const {
    scrollWrapElement,
    isAllDashboadEmpty,
    isLoadingStates,
    projectId,
    testCaseTypesOptions,
    activeTestRunsOptions,
    closedTestRunsMonthlyLineOptions,
    jiraIssuesOptions,
    closedTestRunsDailyLineOptions,
    testCasesTrendOptions,
    fetchAllChartData,
    onDVFooterClick
  } = useDashboard();
  const dispatch = useDispatch();

  // const activeRunsButtonClicked = () => {
  //   dispatch(
  //     logEventHelper('TM_DashboardActiveRunLinkClicked', {
  //       project_id: projectId,
  //       dashboard_id: '1'
  //     })
  //   );
  // };

  // const daysClosedButtonClicked = () => {
  //   dispatch(
  //     logEventHelper('TM_DashboardDaysClosedRunLinkClicked', {
  //       project_id: projectId,
  //       dashboard_id: '1'
  //     })
  //   );
  // };

  useEffect(() => {
    fetchAllChartData();
    if (scrollWrapElement?.current?.scrollTop)
      scrollWrapElement.current.scrollTop = 0;
    dispatch(
      logEventHelper('TM_DashboardPageLoaded', {
        project_id: projectId,
        dashboard_id: '0'
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  return (
    <div className="flex flex-1 shrink-0 grow flex-col overflow-hidden">
      <TMPageHeadings heading="Dashboard" />
      <div
        className="flex flex-1 shrink-0 grow flex-col overflow-y-auto p-6"
        ref={scrollWrapElement}
      >
        <TMAlerts
          show={isAllDashboadEmpty}
          title="Currently, there is no data available in this project."
          detailsNode={null}
          modifier="primary"
        />
        <div className="flex w-full gap-4">
          <div className="relative w-1/2 flex-1">
            <TMDataVisualization
              isLoading={isLoadingStates?.activeTR || false}
              headerInfo
              headerInfoTooltipProps={{
                content: (
                  <div className="text-base-300 w-60 px-4 text-sm">
                    This pie chart shows status of test cases in active test
                    runs.
                  </div>
                ),
                theme: 'dark',
                placementAlign: 'center',
                placementSide: 'bottom',
                size: 'xs',
                children: <MdInfoOutline className="h-5 w-5" />
              }}
              title="Active Test Runs"
              wrapperClassName="bg-white relative"
              size="fit-content"
              footerProps={{
                linkText: 'View All Active Runs',
                linkTo: routeFormatter(AppRoute.TEST_RUNS, { projectId }),
                onClick: (e) =>
                  onDVFooterClick(e, 'TM_DashboardActiveRunLinkClicked')
              }}
              analytics={
                <div className="relative">
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={activeTestRunsOptions}
                  />
                  <div
                    className={classNames(
                      'pointer-events-none absolute top-0 left-0 flex h-full flex-col items-center justify-center',
                      activeTestRunsOptions?.isEmpty ? 'w-full' : 'w-3/5'
                    )}
                  >
                    <div className="text-base-800 text-xl font-bold">
                      {activeTestRunsOptions?.total || ''}
                    </div>
                    <div className="text-base-500 text-xs font-semibold">
                      {activeTestRunsOptions?.isEmpty
                        ? NO_DATA_TEXT
                        : 'Total Test Cases'}
                    </div>
                  </div>
                </div>
              }
            />
          </div>
          <div className="w-1/2 flex-1">
            <TMDataVisualization
              isLoading={isLoadingStates?.closedTRMonthly || false}
              headerInfo
              headerInfoTooltipProps={{
                content: (
                  <div className="text-base-300 w-60 px-4 text-sm">
                    This trendline shows count of test runs closed in last 12
                    months.
                  </div>
                ),
                theme: 'dark',
                placementAlign: 'center',
                placementSide: 'bottom',
                size: 'xs',
                children: <MdInfoOutline className="h-5 w-5" />
              }}
              title="Closed Test Runs (Last 12 Months)"
              wrapperClassName="bg-white relative"
              size="fit-content"
              footerProps={{
                linkText: 'View All Closed Runs',
                linkTo:
                  `${routeFormatter(AppRoute.TEST_RUNS, {
                    projectId
                  })}?closed=true` || '',
                onClick: (e) =>
                  onDVFooterClick(e, 'TM_DashboardMonthsClosedRunLinkClicked')
              }}
              analytics={
                <div className="relative">
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={closedTestRunsMonthlyLineOptions}
                  />
                  {closedTestRunsMonthlyLineOptions?.isEmpty ? (
                    <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-white">
                      <div className="text-base-500 text-xs font-semibold">
                        {NO_DATA_TEXT}
                      </div>
                    </div>
                  ) : null}
                </div>
              }
            />
          </div>
        </div>
        <div className="mt-4 flex w-full">
          <div className="flex-1">
            <TMDataVisualization
              isLoading={isLoadingStates?.closedTRDaily || false}
              headerInfo
              headerInfoTooltipProps={{
                content: (
                  <div className="text-base-300 w-60 px-4 text-sm">
                    This bar chart shows distribution of test case results
                    across closed test runs.
                  </div>
                ),
                theme: 'dark',
                placementAlign: 'center',
                placementSide: 'bottom',
                size: 'xs',
                children: <MdInfoOutline className="h-5 w-5" />
              }}
              title="Results from Closed Test Runs (Last 15 days)"
              wrapperClassName="bg-white relative"
              size="fit-content"
              footerProps={{
                linkText: 'View All Closed Runs',
                linkTo: `${routeFormatter(AppRoute.TEST_RUNS, {
                  projectId
                })}?closed=true`,
                onClick: (e) =>
                  onDVFooterClick(e, 'TM_Dashboard15DaysClosedRunLinkClicked')
              }}
              analytics={
                <div className="relative">
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={closedTestRunsDailyLineOptions}
                  />
                  {closedTestRunsDailyLineOptions?.isEmpty ? (
                    <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-white">
                      <div className="text-base-500 text-xs font-semibold">
                        {NO_DATA_TEXT}
                      </div>
                    </div>
                  ) : null}
                </div>
              }
            />
          </div>
        </div>
        <div className="mt-4 flex w-full gap-4">
          <div className="w-1/2 flex-1">
            <TMDataVisualization
              isLoading={isLoadingStates?.typeOfTC || false}
              title="Type of Test Cases"
              headerInfo
              headerInfoTooltipProps={{
                content: (
                  <div className="text-base-300 w-60 px-4 text-sm">
                    This pie chart shows type of test cases in the project.
                  </div>
                ),
                theme: 'dark',
                placementAlign: 'center',
                placementSide: 'bottom',
                size: 'xs',
                children: <MdInfoOutline className="h-5 w-5" />
              }}
              wrapperClassName="bg-white relative"
              size="fit-content"
              analytics={
                <div className="relative">
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={testCaseTypesOptions}
                  />
                  <div
                    className={classNames(
                      'pointer-events-none absolute top-0 left-0 flex h-full flex-col items-center justify-center',
                      testCaseTypesOptions?.isEmpty ? 'w-full' : 'w-3/5'
                    )}
                  >
                    <div className="text-base-800 text-xl font-bold">
                      {testCaseTypesOptions?.total || ''}
                    </div>
                    <div className="text-base-500 text-xs font-semibold">
                      {testCaseTypesOptions?.isEmpty
                        ? NO_DATA_TEXT
                        : 'Total Test Cases'}
                    </div>
                  </div>
                </div>
              }
            />
          </div>
          <div className="w-1/2 flex-1">
            <TMDataVisualization
              isLoading={isLoadingStates?.trendOfTC || false}
              title="Trend of Test Cases"
              headerInfo
              headerInfoTooltipProps={{
                content: (
                  <div className="text-base-300 w-60 px-4 text-sm">
                    This trendline shows type of test cases in the project over
                    last 12 months.
                  </div>
                ),
                theme: 'dark',
                placementAlign: 'center',
                placementSide: 'bottom',
                size: 'xs',
                children: <MdInfoOutline className="h-5 w-5" />
              }}
              wrapperClassName="bg-white relative"
              size="fit-content"
              analytics={
                <div className="relative">
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={testCasesTrendOptions}
                  />
                  {testCasesTrendOptions?.isEmpty ? (
                    <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center">
                      <div className="text-base-500 text-xs font-semibold">
                        {NO_DATA_TEXT}
                      </div>
                    </div>
                  ) : null}
                </div>
              }
            />
          </div>
        </div>
        <div className="mt-4 flex w-full">
          <div className="flex-1">
            <TMDataVisualization
              isLoading={isLoadingStates?.jiraIssues || false}
              headerInfo
              headerInfoTooltipProps={{
                content: (
                  <div className="text-base-300 w-60 px-4 text-sm">
                    This bar chart shows distribution of JIRA issues linked with
                    test runs/results over last 12 months.
                  </div>
                ),
                theme: 'dark',
                placementAlign: 'center',
                placementSide: 'bottom',
                size: 'xs',
                children: <MdInfoOutline className="h-5 w-5" />
              }}
              title="JIRA Issues (Last 12 Months)"
              wrapperClassName="bg-white relative"
              size="fit-content"
              analytics={
                <div className="relative">
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={jiraIssuesOptions}
                  />
                  {jiraIssuesOptions?.isEmpty ? (
                    <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-white">
                      <div className="text-base-500 text-xs font-semibold">
                        {NO_DATA_TEXT}
                      </div>
                    </div>
                  ) : null}
                </div>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
