import React, { useEffect } from 'react';
import { TMDataVisualization, TMPageHeadings } from 'common/bifrostProxy';
import Highcharts from 'highcharts';
import variablePie from 'highcharts/modules/variable-pie';
import HighchartsReact from 'highcharts-react-official';

import useDashboard from './useDashboard';

variablePie(Highcharts);

const Dashboard = () => {
  const {
    projectId,
    activeTestRunsOptions,
    closedTestRunsLineOptions,
    jiraIssuesOptions,
    closedTestRunsStackedOptions,
    testCasesTrendOptions,
    fetchActiveTestRuns
  } = useDashboard();

  useEffect(() => {
    fetchActiveTestRuns(projectId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-1 shrink-0 grow flex-col overflow-hidden">
      <TMPageHeadings heading="Dashboard" />
      <div className="flex flex-1 shrink-0 grow flex-col overflow-y-auto p-4">
        <div className="flex w-full gap-4">
          <div className="w-1/2 flex-1">
            <TMDataVisualization
              headerInfo={false}
              title="Active Test Runs"
              wrapperClassName="bg-white"
              size="fit-content"
              footerProps={{
                description: 'View All Active Runs',
                linkTo: '#'
              }}
              analytics={
                <HighchartsReact
                  highcharts={Highcharts}
                  options={activeTestRunsOptions}
                />
              }
            />
          </div>
          <div className="w-1/2 flex-1">
            <TMDataVisualization
              headerInfo={false}
              title="Closed Test Runs (Last 12 Months)"
              wrapperClassName="bg-white"
              size="fit-content"
              footerProps={{
                description: 'View All Closed Runs',
                linkTo: '#'
              }}
              analytics={
                <HighchartsReact
                  highcharts={Highcharts}
                  options={closedTestRunsLineOptions}
                />
              }
            />
          </div>
        </div>
        <div className="mt-4 flex w-full">
          <div className="flex-1">
            <TMDataVisualization
              headerInfo={false}
              title="Closed Test Runs (Last 15 days)"
              wrapperClassName="bg-white"
              size="fit-content"
              footerProps={{
                description: 'View All Closed Runs',
                linkTo: '#'
              }}
              analytics={
                <HighchartsReact
                  highcharts={Highcharts}
                  options={closedTestRunsStackedOptions}
                />
              }
            />
          </div>
        </div>
        <div className="mt-4 flex w-full gap-4">
          <div className="w-1/2 flex-1">
            <TMDataVisualization
              title="Type of Test Cases"
              wrapperClassName="bg-white"
              size="fit-content"
              analytics={
                <HighchartsReact
                  highcharts={Highcharts}
                  options={activeTestRunsOptions}
                />
              }
            />
          </div>
          <div className="w-1/2 flex-1">
            <TMDataVisualization
              title="Trend of Test Cases"
              wrapperClassName="bg-white"
              size="fit-content"
              analytics={
                <HighchartsReact
                  highcharts={Highcharts}
                  options={testCasesTrendOptions}
                />
              }
            />
          </div>
        </div>
        <div className="mt-4 flex w-full">
          <div className="flex-1">
            <TMDataVisualization
              headerInfo={false}
              title="JIRA Issues (Last 12 Months)"
              wrapperClassName="bg-white"
              size="fit-content"
              analytics={
                <HighchartsReact
                  highcharts={Highcharts}
                  options={jiraIssuesOptions}
                />
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
