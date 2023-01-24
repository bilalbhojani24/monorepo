import React from 'react';
import { InfoOutlinedIcon } from 'assets/icons';
import {
  TMBadge,
  TMDataTable,
  TMEmptyState,
  TMTabs,
} from 'common/bifrostProxy';
import { formatTime } from 'utils/helperFunctions';

import { TABS_ARRAY } from '../const/testCaseViewConst';

import useTestCaseView from './useTestCaseView';

const TestCaseMutliData = () => {
  const {
    testRunsCount,
    selectedTab,
    testRunsDetails,
    testCaseIssues,
    handleTabChange,
  } = useTestCaseView();

  const resultsTableColumn = [
    {
      name: 'Test Run Details',
      key: 'test_case_id',
      cell: (rowData) => (
        <div className="flex flex-col">
          <div className="text-base-900 font-medium">{`TR-${rowData.test_case_id} | ${rowData.test_run_name}`}</div>
          <div className="text-base-500">
            {formatTime(rowData.created_at, 'time')}
          </div>
        </div>
      ),
    },
    {
      name: 'Status',
      key: 'latest_status',
      cell: (rowData) => (
        <TMBadge
          wrapperClassName="capitalize"
          text={rowData.latest_status}
          modifier={rowData.latest_status
            .replace('untested', 'base')
            .replace('passed', 'success')
            .replace('failed', 'error')}
        />
      ),
    },
  ];

  const issuesTableColumn = [
    {
      name: 'Issue',
      key: 'jira_id',
      cell: (rowData) => (
        <div className="text-base-900 font-medium">{`${rowData.jira_id}`}</div>
      ),
    },
    {
      name: 'Test Run',
      key: 'jira_id',
      cell: (rowData) => (
        <div className="flex flex-col">
          <div className="text-base-900 font-medium">{`TR-${
            rowData?.test_run_identifier || ''
          }`}</div>
          <div className="text-base-500">{rowData?.test_run_name}</div>
        </div>
      ),
    },
    {
      name: 'Created On',
      key: 'created_at',
      cell: (rowData) => formatTime(rowData.created_at, 'date'),
    },
  ];

  return (
    <>
      <TMTabs
        id="project-tabs"
        tabsArray={TABS_ARRAY.map((item) => ({
          ...item,
          count:
            item.name === 'Results' ? testRunsCount : testCaseIssues?.length,
        }))}
        onTabChange={handleTabChange}
      />

      {selectedTab.name === TABS_ARRAY[0].name && (
        <>
          {testRunsDetails?.length ? (
            <div className="border-base-200 mt-4 overflow-hidden border bg-white sm:rounded-lg">
              <TMDataTable
                isHeaderCapitalize
                columns={resultsTableColumn}
                rows={testRunsDetails}
              />
            </div>
          ) : (
            <div className="mt-10">
              <TMEmptyState
                title="No Results"
                description="Once you start linking this test case in a test run, historical result will appear here"
                mainIcon={
                  <InfoOutlinedIcon className="text-base-400 !h-12 !w-12" />
                }
                buttonProps={null}
              />
            </div>
          )}
        </>
      )}

      {selectedTab.name === TABS_ARRAY[1].name && (
        <>
          {testCaseIssues?.length ? (
            <div className="border-base-200 mt-4 overflow-hidden border bg-white sm:rounded-lg">
              <TMDataTable
                isHeaderCapitalize
                columns={issuesTableColumn}
                rows={testCaseIssues}
              />
            </div>
          ) : (
            <div className="mt-10">
              <TMEmptyState
                title="No Issues"
                description="Once you start linking issues with this test run, it will show here"
                mainIcon={
                  <InfoOutlinedIcon className="text-base-400 !h-12 !w-12" />
                }
                buttonProps={null}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default TestCaseMutliData;
