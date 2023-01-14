import React from 'react';
import {
  TMBadge,
  TMDataTable,
  TMStackedListWSingleColumn,
  TMTabs,
} from 'bifrostProxy';

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
      key: 'test_run_status',
      cell: (rowData) => (
        <TMBadge
          text={rowData.test_run_status}
          modifier={
            rowData.test_run_status === 'untested'
              ? 'base'
              : rowData.test_run_status
          }
        />
      ),
    },
  ];

  return (
    <>
      <TMTabs
        id="project-tabs"
        tabsArray={TABS_ARRAY}
        onTabChange={handleTabChange}
      />

      {selectedTab === TABS_ARRAY[0] && (
        <>
          {testRunsDetails && testRunsDetails.length ? (
            <div className="border-base-200 mt-4 overflow-hidden border bg-white sm:rounded-lg">
              <TMDataTable
                isHeaderCapitalize
                columns={tableColumns}
                rows={testRunsDetails}
                isFullWhite={false}
              />
            </div>
          ) : (
            'No Data'
          )}
        </>
      )}

      {selectedTab === TABS_ARRAY[1] && (
        <TMStackedListWSingleColumn
          format="with_truncated_content_preview"
          list={testCaseIssues.map((item) => ({
            ...item,
            heading: item.jira_id,
            subHeading: item.jira_id,
            textAside: item.jira_id,
            preview: item.test_case_id,
          }))}
        />
      )}
    </>
  );
};

export default TestCaseMutliData;
