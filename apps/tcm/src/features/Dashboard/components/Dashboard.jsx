import React, { useEffect } from 'react';
import { MdInfoOutline } from '@browserstack/bifrost';
import classNames from 'classnames';
import { TMDataVisualization, TMPageHeadings } from 'common/bifrostProxy';
import AppRoute from 'const/routes';
import Highcharts from 'highcharts';
import variablePie from 'highcharts/modules/variable-pie';
import HighchartsReact from 'highcharts-react-official';
import { routeFormatter } from 'utils/helperFunctions';

import useDashboard from './useDashboard';

variablePie(Highcharts);

const Dashboard = () => {
  const {
    isLoadingStates,
    projectId,
    testCaseTypesOptions,
    activeTestRunsOptions,
    closedTestRunsMonthlyLineOptions,
    jiraIssuesOptions,
    closedTestRunsDailyLineOptions,
    testCasesTrendOptions,
    fetchAllChartData
  } = useDashboard();

  useEffect(() => {
    fetchAllChartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  return (
    <div className="flex flex-1 shrink-0 grow flex-col overflow-hidden">
      <TMPageHeadings heading="Dashboard" />
      <div className="flex flex-1 shrink-0 grow flex-col overflow-y-auto p-4">
        <div className="flex w-full gap-4">
          <div className="relative w-1/2 flex-1">
            <TMDataVisualization
              isLoading={isLoadingStates?.activeTR || false}
              headerInfo={false}
              title="Active Test Runs"
              wrapperClassName="bg-white relative"
              size="fit-content"
              footerProps={{
                linkText: 'View All Active Runs',
                linkTo: routeFormatter(AppRoute.TEST_RUNS, { projectId })
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
                        ? 'No data to display'
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
              headerInfo={false}
              title="Closed Test Runs (Last 12 Months)"
              wrapperClassName="bg-white relative"
              size="fit-content"
              footerProps={{
                linkText: 'View All Closed Runs',
                linkTo:
                  `${routeFormatter(AppRoute.TEST_RUNS, {
                    projectId
                  })}?closed=true` || ''
              }}
              analytics={
                <div className="relative">
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={closedTestRunsMonthlyLineOptions}
                  />
                  {closedTestRunsMonthlyLineOptions?.isEmpty ? (
                    <div className="absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center">
                      <div className="text-base-500 text-xs font-semibold">
                        No data to display
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
              headerInfo={false}
              title="Closed Test Runs (Last 15 days)"
              wrapperClassName="bg-white relative"
              size="fit-content"
              footerProps={{
                linkText: 'View All Closed Runs',
                linkTo: `${routeFormatter(AppRoute.TEST_RUNS, {
                  projectId
                })}?closed=true`
              }}
              analytics={
                <div className="relative">
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={closedTestRunsDailyLineOptions}
                  />
                  {closedTestRunsDailyLineOptions?.isEmpty ? (
                    <div className="absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center">
                      <div className="text-base-500 text-xs font-semibold">
                        No data to display
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
                    Below is the list of the test cases available within the
                    project. This list shows the top 5 types of test cases.
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
                  <div className="pointer-events-none absolute top-0 left-0 flex h-full w-3/5 flex-col items-center justify-center">
                    <div className="text-base-800 text-xl font-bold">
                      {testCaseTypesOptions?.total || ''}
                    </div>
                    <div className="text-base-500 text-xs font-semibold">
                      {testCaseTypesOptions?.isEmpty
                        ? 'No data to display'
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
                    Below is the trend of various types of test cases over a
                    period of one yeart. This list shows the top 5 types of test
                    cases.
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
                    <div className="absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center">
                      <div className="text-base-500 text-xs font-semibold">
                        No data to display
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
                content: <div className="text-base-300 w-60 px-4 text-sm" />,
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
                    <div className="absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center">
                      <div className="text-base-500 text-xs font-semibold">
                        No data to display
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
