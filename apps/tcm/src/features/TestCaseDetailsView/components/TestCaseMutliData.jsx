import React from 'react';
import { InfoOutlinedIcon } from 'assets/icons';
import {
  TMBadge,
  TMDataTable,
  TMEmptyState,
  TMStackedListWSingleColumn,
  TMTabs,
} from 'bifrostProxy';
import { formatTime } from 'utils/helperFunctions';

import { TABS_ARRAY } from '../const/testCaseViewConst';

import useTestCaseView from './useTestCaseView';

const TestCaseMutliData = () => {
  const { selectedTab, testRunsDetails, testCaseIssues, handleTabChange } =
    useTestCaseView();

  const tableColumns = [
    {
      name: 'ID',
      key: 'test_run_id',
      cell: (rowData) => (
        <div role="button" className="hover:text-brand-600 cursor-pointer">
          {rowData.test_run_id}
        </div>
      ),
    },
    {
      name: 'Test Run Name',
      key: 'test_run_name',
    },
    {
      name: 'Status',
      key: 'latest_status',
      cell: (rowData) => (
        <TMBadge
          wrapperClassName="capitalize"
          text={rowData.latest_status}
          modifier={
            rowData.latest_status === 'untested'
              ? 'base'
              : rowData.latest_status
          }
        />
      ),
    },
  ];

  return (
    <>
      <TMTabs
        id="project-tabs"
        tabsArray={TABS_ARRAY.map((item) => ({
          ...item,
          count:
            item.name === 'Results'
              ? `${testRunsDetails.length}`
              : `${testCaseIssues.length}`,
        }))}
        onTabChange={handleTabChange}
      />

      {selectedTab.name === TABS_ARRAY[0].name && (
        <>
          {testRunsDetails?.length ? (
            <div className="border-base-200 mt-4 overflow-hidden border bg-white sm:rounded-lg">
              <TMDataTable
                isHeaderCapitalize
                columns={tableColumns}
                rows={testRunsDetails}
                isFullWhite={false}
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
            <TMStackedListWSingleColumn
              format="with_truncated_content_preview"
              list={testCaseIssues.map((item) => ({
                ...item,
                heading: item.jira_id,
                subHeading: item.jira_id,
                textAside: formatTime(item.created_at, 'ago'),
                preview: item.test_case_id,
              }))}
            />
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
