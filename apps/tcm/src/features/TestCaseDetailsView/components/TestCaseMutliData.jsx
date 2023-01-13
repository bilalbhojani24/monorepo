import React from 'react';
import { TMBadge, TMDataTable, TMTabs } from 'bifrostProxy';

import { TABS_ARRAY } from '../const/testCaseViewConst';

import useTestCaseView from './useTestCaseView';

const TestCaseMutliData = () => {
  const { testRunsDetails, handleTabChange } = useTestCaseView();

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
      <div className="border-base-200 mt-4 overflow-hidden border bg-white sm:rounded-lg">
        <TMDataTable
          isHeaderCapitalize
          columns={tableColumns}
          rows={testRunsDetails}
          isFullWhite={false}
        />
      </div>
    </>
  );
};

export default TestCaseMutliData;
